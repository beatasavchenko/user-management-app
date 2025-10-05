--
-- PostgreSQL database dump
--

\restrict VtYLGfjIloLXIt7hfLFp81PQWY3dUH8ZX6wplC4gP5dPjkbluPVx8zabrL2D1eg

-- Dumped from database version 18.0 (Debian 18.0-1.pgdg13+3)
-- Dumped by pg_dump version 18.0 (Debian 18.0-1.pgdg13+3)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    customer_number text NOT NULL,
    username text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    last_login timestamp(3) without time zone NOT NULL,
    date_of_birth timestamp(3) without time zone NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (customer_number, username, first_name, last_name, email, last_login, date_of_birth, password) FROM stdin;
00000	randomusername	Max	Mustermann	maxmuster@gmail.com	2025-10-05 12:47:43.558	2005-01-06 00:00:00	$2b$10$7i1ds2nj.xCcEEXwReVx5uRghZmhnDTgzl0kMClBLh0/dIDyapAuW
00001	erikamuster	Erika	Musterfrau	erika@gmail.com	2025-10-05 12:48:38.3	1995-01-31 00:00:00	$2b$10$yrkIC7RhWai6yPy0kRhBM.31lE/T9iWlVdW0C870emyTFlrp/U.nq
00002	dpreddle0	Dari	Preddle	dpreddle0@eepurl.com	2025-10-05 12:55:25.02	2010-02-17 00:00:00	$2b$10$XwpLi4IqJrKtwILKKWoJPO53ySwXxHd1dLicOBMecr4w8/BGNnBNC
00003	ebefroy1	Emlynn	Befroy	ebefroy1@nydailynews.com	2025-10-05 12:56:07.903	2007-01-30 00:00:00	$2b$10$WuRn.rQZW2ISrnsehKeiaOqDsQwk0AF0pyU6IE5xzxLbaNa9z0pl6
00004	cellph2	Celeste	Ellph	cellph2@theguardian.com	2025-10-05 12:56:45.51	1999-07-07 00:00:00	$2b$10$UjNaBhRyQi5yf4pRQa3nYO9jM6jfEeDpCY1CwYFLJkggCELRpiPw.
00005	cmeconi3	Chip	Meconi	cmeconi3@altervista.org	2025-10-05 12:57:16.936	2002-07-10 00:00:00	$2b$10$e/Yoo15ok/ryAlRs1j1QNe9hg8m5rwiG8q9aFcJvJW.SeJCqKapXK
00006	mmcelwee4	Michale	McElwee	mmcelwee4@homestead.com	2025-10-05 12:57:46.139	2012-01-31 00:00:00	$2b$10$rh7EMYXXJc9rPTIAoWYg3eFkMaeX51WHxhcfWA.0kJugjE6oVqG1a
00007	nvidean5	Nathan	Videan	nvidean5@youtube.com	2025-10-05 12:58:30.61	1991-06-03 00:00:00	$2b$10$kYKNnafItmstxqS5zt9BUOCGv1S3TTJMnXAyDYraN6zBATRqZng5u
00008	bmaciver6	Brigg	MacIver	bmaciver6@blogger.com	2025-10-05 12:59:03.027	2004-04-01 00:00:00	$2b$10$/qHsLkAh8a9H2Izt836nQe6ceBSSRma3zdomXtnMBS2zU5DtLl3H.
00009	awombwell7	Almeria	Wombwell	awombwell7@disqus.com	2025-10-05 12:59:38.049	2000-02-01 00:00:00	$2b$10$T0yTXYsb03MnxZYxWJGRV.Lehp0/1WkSoyVfZGyXhcLfriqUyIPpG
00010	pkleinmintz8	Putnam	Kleinmintz	pkleinmintz8@prweb.com	2025-10-05 13:00:31.279	1988-08-11 00:00:00	$2b$10$uuUpPCFrWD8DXMM8f04e8e44JSMay1LXfrYZSTW8ZXv2jKJDdpX4m
00011	csabatier9	Carry	Sabatier	csabatier9@nsw.gov.au	2025-10-05 13:01:04.926	2007-01-30 00:00:00	$2b$10$Ry2BGJqayFtxQ02XL0ed/u2fd7PyE6g4Bf3GkhhIqaKV..c6IDEbG
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
cfd9d357-2674-4169-b78e-a035bdd593b8	41823b5ba494f310786893ca7c85662bc19ecb6b356f4c98e1ffe71cc17d0906	2025-10-04 07:21:20.128355+00	20251004072120_init	\N	\N	2025-10-04 07:21:20.115001+00	1
ae05d35e-8d5f-4a67-beed-7f830ca0c534	bc22b30ffba33b5a4501c81e5b460138dda3f51abed5abaa87b7edb17beba0f0	2025-10-04 13:07:30.36988+00	20251004130730_change	\N	\N	2025-10-04 13:07:30.327616+00	1
83d5b69b-0be3-4dcc-aad2-436b840e9421	80a57def48a48803609fd1d1862f7c06c492c449e06ef8ede10428c1d2366235	2025-10-04 13:10:59.017616+00	20251004131058_change	\N	\N	2025-10-04 13:10:59.004089+00	1
\.


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (customer_number);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_customer_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_customer_number_key" ON public."User" USING btree (customer_number);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- PostgreSQL database dump complete
--

\unrestrict VtYLGfjIloLXIt7hfLFp81PQWY3dUH8ZX6wplC4gP5dPjkbluPVx8zabrL2D1eg

