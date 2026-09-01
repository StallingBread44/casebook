-- ==============================================================================
-- CaseBook — Supabase Database Schema & Architecture
-- Academic Research Publication & Service Verification Platform
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 1. Profiles Table (Linked to Supabase auth.users)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  email text,
  school text,
  grade text,
  role text default 'student' check (role in ('student', 'reviewer', 'editor', 'admin')),
  bio text,
  avatar_url text,
  verified_hours numeric default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Trigger to automatically create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, school, grade, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce(new.raw_user_meta_data->>'school', ''),
    coalesce(new.raw_user_meta_data->>'grade', ''),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==============================================================================
-- 2. Research Papers Table
-- ==============================================================================
create table if not exists public.papers (
  id uuid default uuid_generate_v4() primary key,
  record_id text unique not null, -- e.g. "CB-2024-001"
  slug text unique,
  title text not null,
  abstract text not null,
  field text not null,
  secondary_field text,
  type text not null, -- Empirical study, Systematic review, Quantitative analysis, etc.
  difficulty text not null check (difficulty in ('Introductory', 'Intermediate', 'Advanced')),
  reading_minutes integer default 5,
  authors jsonb not null default '[]'::jsonb, -- [{ name, school, grade, role, handle }]
  published_at date default current_date,
  featured boolean default false,
  reads_count integer default 0,
  citations_count integer default 0,
  verified_hours numeric default 0,
  pdf_url text,
  dataset_url text,
  doi text,
  tags text[] default array[]::text[],
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 3. Research Projects / Opportunities Table
-- ==============================================================================
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  record_id text unique not null, -- e.g. "OP-2024-012"
  slug text unique not null,
  title text not null,
  summary text not null,
  field text not null,
  secondary_field text,
  difficulty text not null check (difficulty in ('Introductory', 'Intermediate', 'Advanced')),
  time_commitment text not null,
  max_hours numeric not null default 0,
  deadline date not null,
  status text not null check (status in ('Open', 'Filling Fast', 'Waitlist', 'Closed')),
  deliverable text not null,
  skills text[] default array[]::text[],
  packet_details jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 4. Submissions Table (Student draft uploads and review status)
-- ==============================================================================
create table if not exists public.submissions (
  id uuid default uuid_generate_v4() primary key,
  record_id text unique not null, -- e.g. "SUB-2024-089"
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  field text not null,
  abstract text not null,
  authors jsonb not null default '[]'::jsonb,
  file_url text,
  data_url text,
  ai_declaration text,
  status text not null default 'submitted' check (
    status in ('draft', 'submitted', 'in_review', 'revisions_requested', 'approved', 'published', 'rejected')
  ),
  requested_hours numeric default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 5. Reviews Table (Reviewer evaluation & 8-point rubric feedback)
-- ==============================================================================
create table if not exists public.reviews (
  id uuid default uuid_generate_v4() primary key,
  submission_id uuid references public.submissions(id) on delete cascade not null,
  reviewer_id uuid references public.profiles(id) on delete set null,
  reviewer_name text not null,
  reviewer_role text,
  criteria_scores jsonb default '{}'::jsonb, -- { question: 4, methodology: 5, ... }
  overall_feedback text not null,
  decision text not null check (decision in ('approve', 'revise', 'reject')),
  awarded_hours numeric default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 6. Verified Service Records Table (Volunteer hours credentials)
-- ==============================================================================
create table if not exists public.service_records (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  verification_code text unique not null, -- e.g. "CB-VRF-88219"
  project_title text not null,
  field text not null,
  hours numeric not null,
  reviewer_name text not null,
  reviewer_institution text,
  approved_at timestamptz default timezone('utc'::text, now()) not null,
  status text default 'verified' check (status in ('verified', 'pending', 'revoked'))
);

-- ==============================================================================
-- 7. Sponsors & Partners Table
-- ==============================================================================
create table if not exists public.sponsors (
  id text primary key, -- slug id
  name text not null,
  org text not null,
  tagline text not null,
  category text not null,
  hero_image text not null,
  logo text,
  url text not null,
  description text not null,
  highlights text[] default array[]::text[],
  location text not null,
  founded text,
  support_area text not null,
  active boolean default true,
  display_order integer default 0
);

-- ==============================================================================
-- 8. Inquiries / Contact Form Submissions Table
-- ==============================================================================
create table if not exists public.inquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  category text not null,
  message text not null,
  status text default 'unread' check (status in ('unread', 'in_progress', 'resolved')),
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 9. News / Field Notes Table
-- ==============================================================================
create table if not exists public.news (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  lead text not null,
  category text not null,
  body text not null,
  author text not null,
  published_at date default current_date,
  featured boolean default false
);

-- ==============================================================================
-- Row-Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.papers enable row level security;
alter table public.projects enable row level security;
alter table public.submissions enable row level security;
alter table public.reviews enable row level security;
alter table public.service_records enable row level security;
alter table public.sponsors enable row level security;
alter table public.inquiries enable row level security;
alter table public.news enable row level security;

-- Profiles: Public read, owner update
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
create policy "Public profiles are viewable by everyone" on public.profiles
  for select to anon, authenticated using (true);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- Papers, Projects, News, Sponsors: Public read
drop policy if exists "Papers are viewable by everyone" on public.papers;
create policy "Papers are viewable by everyone" on public.papers
  for select to anon, authenticated using (true);

drop policy if exists "Projects are viewable by everyone" on public.projects;
create policy "Projects are viewable by everyone" on public.projects
  for select to anon, authenticated using (true);

drop policy if exists "Sponsors are viewable by everyone" on public.sponsors;
create policy "Sponsors are viewable by everyone" on public.sponsors
  for select to anon, authenticated using (true);

drop policy if exists "News is viewable by everyone" on public.news;
create policy "News is viewable by everyone" on public.news
  for select to anon, authenticated using (true);

-- Submissions: Users can view & manage their own submissions
drop policy if exists "Users can view own submissions" on public.submissions;
create policy "Users can view own submissions" on public.submissions
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users can insert own submissions" on public.submissions;
create policy "Users can insert own submissions" on public.submissions
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "Users can update own draft submissions" on public.submissions;
create policy "Users can update own draft submissions" on public.submissions
  for update to authenticated using (auth.uid() = user_id);

-- Service Records: Users can view own verified records, or anyone with verification code
drop policy if exists "Users can view own service records" on public.service_records;
create policy "Users can view own service records" on public.service_records
  for select to anon, authenticated using (true);

-- Inquiries: Anyone can submit an inquiry (Contact form)
drop policy if exists "Anyone can insert inquiries" on public.inquiries;
create policy "Anyone can insert inquiries" on public.inquiries
  for insert to anon, authenticated with check (true);

-- ==============================================================================
-- Initial Seed: Sponsors
-- ==============================================================================
insert into public.sponsors (id, name, org, tagline, category, hero_image, logo, url, description, highlights, location, founded, support_area, display_order)
values
  (
    'american-kidney-institute',
    'American Kidney Institute',
    'American Kidney Institute',
    'Premier Nephrology & Dialysis Clinical Care · America',
    'Healthcare',
    '/americankidneyinstitute.png',
    '/sponsor-aki-logo.jpg',
    'https://americankidneyinstitute.com/',
    'American Kidney Institute is a premier clinical nephrology and urology hospital committed to delivering world-class kidney care. Their clinical mission bridges American medical standards with compassionate, accessible treatment for patients.',
    array[
      'Specialized nephrology & urology clinical care',
      'State-of-the-art dialysis center & patient monitoring',
      'Kidney transplant services & post-operative care',
      '24/7 emergency nephrology & critical care unit'
    ],
    'America',
    '2024',
    'Clinical Health & Medical Research Fellowship',
    1
  ),
  (
    'efftronics',
    'Efftronics Systems',
    'Efftronics Systems Pvt. Ltd.',
    'End-to-End Smart Solutions & IoT Infrastructure',
    'Technology',
    '/effetronics.jpeg',
    '/sponsor-efftronics-logo.svg',
    'https://www.efftronics.com',
    'Efftronics is a leading electronics manufacturer delivering innovative smart solutions for Smart Cities, Buildings, Railway Signaling, and IoT ecosystems. Their automation and digitization products power vibrant, connected communities across India.',
    array[
      'Smart City infrastructure & IoT data platforms',
      'Railway signaling, train control & safety systems',
      'Building automation & intelligent energy monitoring',
      'Indigenous electronics manufacturing (Make in India)'
    ],
    'Vijayawada, India',
    '1997',
    'Computational Systems & Embedded Engineering Grant',
    2
  ),
  (
    'kosh-realty',
    'Kosh Realty',
    'Kosh Realty',
    'Real Estate Advisory, Valuation & Investment',
    'Real Estate',
    '/sponsor-kosh.jpg',
    '/sponsor-kosh-logo.png',
    'https://www.koshrealty.com/15/our_team/15',
    'Kosh Realty is a dedicated real estate advisory firm connecting buyers, sellers, and investors with residential and commercial properties. Their experienced team delivers personalized market analytics, valuation research, and trusted guidance through every transaction.',
    array[
      'Residential & commercial sales and acquisitions',
      'Buyer, seller & institutional representation',
      'Investment property consulting & portfolio growth',
      'Regional market analysis, trends & property valuation'
    ],
    'Phoenix, USA',
    null,
    'Economic Analysis & Urban Geography Project Support',
    3
  ),
  (
    'nitsdata',
    'NITSDATA',
    'NITSDATA',
    'Software Development & Talent Solutions',
    'Technology',
    '/sponsor-nitsdata.jpg',
    '/sponsor-nitsdata-logo.png',
    'https://nitsdata.com/',
    'NITSDATA is a Frisco, TX-based technology and talent solutions firm specializing in software development, product engineering, data analytics, cloud architecture, and executive recruiting. They help education and enterprise clients navigate complex digital transformation challenges.',
    array[
      'Custom software engineering & full-stack development',
      'Data analytics pipelines & cloud infrastructure',
      'Technical talent acquisition & executive search',
      'Enterprise product testing, QA & DevOps solutions'
    ],
    'Frisco, TX · Hyderabad, India',
    '2020',
    'Data Science & Technical Review Mentorship',
    4
  ),
  (
    'jei-learning',
    'JEI Learning Center',
    'JEI Learning Center — Frisco',
    'Individualized Math & English Tutoring',
    'Education',
    '/sponsor-jei.jpg',
    '/sponsor-jei-logo.png',
    'https://jeilearning.com/frisco/',
    'JEI Learning Center Frisco provides individualized Math, English, and Reading programs for K-12 students using JEI''s proven Self-Learning System. Free diagnostic assessments identify each student''s exact learning baseline, and structured instruction builds lasting academic confidence.',
    array[
      'Comprehensive diagnostic academic assessments',
      'Individualized, self-paced learning pathways',
      'Foundational Math, English & Reading comprehension',
      'Small-group tutoring, after-school & weekend sessions'
    ],
    'Frisco, TX',
    '2018',
    'K-12 Educational Access & Scholar Outreach',
    5
  ),
  (
    'absolute-milk',
    'Absolute Milk',
    'Absolute Milk (VK Dairy)',
    'Farm-Fresh Dairy & Sustainable Agriculture · Hyderabad, India',
    'Healthcare',
    '/absolutemilk.png',
    null,
    'https://absolutemilk.com/',
    'Absolute Milk is a farm-to-table dairy producer delivering pure, unadulterated milk and dairy products. Their farm-first infrastructure combines ethical animal care with modern cold-chain processing standards to provide clean, wholesome nutrition.',
    array[
      'Farm-to-home fresh dairy production & supply chain',
      'Zero-adulteration quality testing & cold chain preservation',
      'Sustainable livestock welfare & nutritional science',
      'Community nutrition outreach & agricultural research support'
    ],
    'Hyderabad, India',
    '2018',
    'Nutritional Science & Agricultural Supply Chain Research',
    6
  ),
  (
    'pratap-hospital',
    'Pratap Hospital',
    'Pratap Super-Speciality Hospital',
    'Plastic, Cosmetic & Reconstructive Surgery · Vijayawada, India',
    'Healthcare',
    '/pratap.png',
    null,
    'https://prataphospital.com/#facilities',
    'Pratap Hospital is a premier super-speciality hospital in Vijayawada, led by Dr. Pratap Duggirala (MS, MCh). Specializing in cosmetic, reconstructive, hand, burns, and microsurgery, the hospital delivers high-precision clinical care with advanced operating facilities.',
    array[
      'Advanced reconstructive, cosmetic & microsurgical procedures',
      'Dedicated burn intensive care & trauma stabilization units',
      'State-of-the-art laminar airflow operating theaters',
      'Clinical fellowship & surgical outcome research mentorship'
    ],
    'Vijayawada, India',
    '2009',
    'Clinical Surgical Research & Reconstructive Medicine Fellowship',
    7
  ),
  (
    'anuradha-timber',
    'Anuradha Timbers',
    'Anuradha Timbers International',
    'Architectural Hardwoods & Sustainable Timber · Hyderabad, India',
    'Real Estate',
    '/anuradhatimber.png',
    null,
    'http://anuradhatimber.com/',
    'Anuradha Timbers International is a premier importer and processor of seasoned architectural hardwoods and exotic timbers. They supply sustainable wood solutions for bespoke architecture, structural design, and specialized heritage restoration.',
    array[
      'Imported sustainable hardwoods (Teak, Rosewood, Oak, Merbau)',
      'Precision seasoning, kiln-drying & wood preservation technology',
      'Architectural woodwork & sustainable material engineering',
      'Environmental timber research & sustainable forestry advocacy'
    ],
    'Hyderabad, India',
    '1989',
    'Sustainable Materials, Forestry Science & Environmental Design Grant',
    8
  )
on conflict (id) do update set
  name = excluded.name,
  org = excluded.org,
  tagline = excluded.tagline,
  category = excluded.category,
  hero_image = excluded.hero_image,
  logo = excluded.logo,
  url = excluded.url,
  description = excluded.description,
  highlights = excluded.highlights,
  location = excluded.location,
  founded = excluded.founded,
  support_area = excluded.support_area;
