create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '未命名玩家',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles(id) on delete cascade,
  source_game_id uuid references games(id) on delete set null,
  title text not null,
  description text not null default '',
  game_type text not null check (game_type in ('sliding_puzzle', 'number_merge', 'path_connect')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  config jsonb not null default '{}'::jsonb,
  visibility text not null default 'public' check (visibility in ('public', 'unlisted', 'private')),
  review_status text not null default 'approved' check (review_status in ('pending', 'approved', 'rejected')),
  remix_count integer not null default 0,
  play_count integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists game_drafts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles(id) on delete cascade,
  source_game_id uuid references games(id) on delete set null,
  title text not null default '未命名游戏',
  description text not null default '',
  game_type text not null check (game_type in ('sliding_puzzle', 'number_merge', 'path_connect')),
  difficulty text not null default 'easy' check (difficulty in ('easy', 'medium', 'hard')),
  config jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists favorites (
  user_id uuid not null references profiles(id) on delete cascade,
  game_id uuid not null references games(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table if not exists guide_reports (
  id uuid primary key default gen_random_uuid(),
  draft_id uuid not null references game_drafts(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  summary text not null,
  issues jsonb not null default '[]'::jsonb,
  publish_ready boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table games enable row level security;
alter table game_drafts enable row level security;
alter table favorites enable row level security;
alter table guide_reports enable row level security;

create policy "公开游戏可读" on games for select using (visibility = 'public' and review_status = 'approved');
create policy "作者管理自己的游戏" on games for all using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "用户管理自己的资料" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "用户管理自己的草稿" on game_drafts for all using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "用户管理自己的收藏" on favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
