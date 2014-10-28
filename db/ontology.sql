
CREATE TEMPORARY TABLE ontology_bootstrap(
  start_date domain_timestamp,
  user_id uuid,
  project_id uuid
);

CREATE FUNCTION pg_temp.load_ontology_bootstrap()
RETURNS void
LANGUAGE plpgsql
AS $$
  DECLARE
    _start_date domain_timestamp;
    _user_id uuid;
    _project_id uuid;
  BEGIN

    _start_date := '2002-01-01';

    INSERT INTO users
      (username, name, created)
    VALUES
      ('admin', 'Administrator', _start_date)
    RETURNING user_id INTO _user_id;

    INSERT INTO projects
      (slug, name, creator_user_id, created)
    VALUES
      ('global', 'Global', _user_id, _start_date)
    RETURNING project_id INTO _project_id;

    INSERT INTO project_user_grants
      (project_id, user_id, project_role_id, grantor_user_id, created)
    VALUES
      (_project_id, _user_id, 101, _user_id, _start_date); -- owner

    INSERT INTO ontology_bootstrap
      (start_date, user_id, project_id)
    VALUES
      (_start_date, _user_id, _project_id);

  END;
$$;

-- insert universal scheme concept (null project_id)
CREATE FUNCTION pg_temp.insert_concept(_name domain_string_255_nonblank,
                                       _slug domain_string_255_nonblank,
                                       _parent_slug domain_string_255_nonblank DEFAULT NULL,
                                       _parent2_slug domain_string_255_nonblank DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
AS $$
  DECLARE
    _boot ontology_bootstrap;
    _concept_id uuid;
    _parent_concept_id uuid;
    _parent2_concept_id uuid;
  BEGIN

    SELECT * FROM ontology_bootstrap
      INTO STRICT _boot;

    IF _parent_slug IS NOT NULL THEN

      SELECT concept_id
        INTO STRICT _parent_concept_id
        FROM concepts
        WHERE slug = _parent_slug;

    END IF;

    IF _parent2_slug IS NOT NULL THEN

      SELECT concept_id
        INTO STRICT _parent2_concept_id
        FROM concepts
        WHERE slug = _parent2_slug;

    END IF;

    INSERT INTO concepts
      (name,
       slug,
       project_id,
       creator_user_id,
       created)
    VALUES
      (_name,
       _slug,
       _boot.project_id,
       _boot.user_id,
       _boot.start_date)
    RETURNING concept_id INTO STRICT _concept_id;

    IF _parent_concept_id IS NOT NULL THEN

      INSERT INTO concept_relations
        (concept_id,
         concept_relation_type_id,
         related_concept_id,
         project_id,
         creator_user_id,
         created)
      VALUES
        (_concept_id,
         101, -- has-broader
         _parent_concept_id,
         _boot.project_id,
         _boot.user_id,
         _boot.start_date);

    END IF;

    IF _parent2_concept_id IS NOT NULL THEN

      INSERT INTO concept_relations
        (concept_id,
         concept_relation_type_id,
         related_concept_id,
         project_id,
         creator_user_id,
         created)
      VALUES
        (_concept_id,
         101, -- has-broader
         _parent2_concept_id,
         _boot.project_id,
         _boot.user_id,
         _boot.start_date);

    END IF;

    RETURN _concept_id;

  END;
$$;

CREATE FUNCTION pg_temp.insert_link_type(_link_type_id domain_positive_integer,
                                         _slug domain_string_255_nonblank,
                                         _converse_slug domain_string_255_nonblank DEFAULT NULL,
                                         _domain_slug domain_string_255_nonblank DEFAULT NULL,
                                         _range_slug domain_string_255_nonblank DEFAULT NULL,
                                         _link_target_type_id domain_positive_integer DEFAULT 41) -- document
RETURNS VOID
LANGUAGE plpgsql
AS $$
  DECLARE
    _boot ontology_bootstrap;
    _domain_concept_id uuid;
    _range_concept_id uuid;
  BEGIN

    SELECT * FROM ontology_bootstrap
      INTO STRICT _boot;

    IF _domain_slug IS NOT NULL THEN

      SELECT concept_id
        INTO STRICT _domain_concept_id
        FROM concepts
        WHERE slug = _domain_slug;

    END IF;

    IF _range_slug IS NOT NULL THEN

      SELECT concept_id
        INTO STRICT _range_concept_id
        FROM concepts
        WHERE slug = _range_slug;

    END IF;

    IF _converse_slug IS NULL THEN

      INSERT INTO link_types
        (link_type_id,
          slug,
          link_target_type_id,
          domain_concept_id,
          range_concept_id,
          project_id,
          creator_user_id,
          created)
      VALUES
        (_link_type_id,
         _slug,
         _link_target_type_id,
         _domain_concept_id,
         _range_concept_id,
         _boot.project_id,
         _boot.user_id,
         _boot.start_date);

    ELSIF _converse_slug = _slug THEN

      INSERT INTO link_types
        (link_type_id,
          converse_link_type_id,
          slug,
          link_target_type_id,
          domain_concept_id,
          range_concept_id,
          project_id,
          creator_user_id,
          created)
      VALUES
        (_link_type_id,
         _link_type_id,
         _slug,
         _link_target_type_id,
         _domain_concept_id,
         _range_concept_id,
         _boot.project_id,
         _boot.user_id,
         _boot.start_date);

    ELSE

      INSERT INTO link_types
        (link_type_id,
          converse_link_type_id,
          slug,
          link_target_type_id,
          domain_concept_id,
          range_concept_id,
          project_id,
          creator_user_id,
          created)
      VALUES
        (_link_type_id,
         _link_type_id + 1,
         _slug,
         _link_target_type_id,
         _domain_concept_id,
         _range_concept_id,
         _boot.project_id,
         _boot.user_id,
         _boot.start_date),
        (_link_type_id + 1,
         _link_type_id,
         _converse_slug,
         _link_target_type_id,
         _range_concept_id,
         _domain_concept_id,
         _boot.project_id,
         _boot.user_id,
         _boot.start_date);

    END IF;

  END;
$$;

CREATE FUNCTION pg_temp.define_ontology()
RETURNS VOID
LANGUAGE plpgsql
AS $$
  DECLARE
    _boot ontology_bootstrap;
  BEGIN

    PERFORM pg_temp.load_ontology_bootstrap();

    SELECT * FROM ontology_bootstrap
      INTO STRICT _boot;

    -- abstractions

    PERFORM pg_temp.insert_concept('Abstraction', 'abstraction');
    -- ptop:Abstract, schema:Intangible

    PERFORM pg_temp.insert_concept('Topic', 'topic', 'abstraction');
    -- ptop:Topic, db:TopicalConcept

    PERFORM pg_temp.insert_concept('Tag', 'tag', 'abstraction');

    PERFORM pg_temp.insert_concept('Abstract Collection', 'abstract-collection', 'abstraction');

    PERFORM pg_temp.insert_concept('Timeline', 'timeline', 'abstract-collection');

    -- ptop:Abstract, schema:Intangible


    -- abstract entities

    PERFORM pg_temp.insert_concept('Entity', 'entity');
    -- bfo:Entity

    PERFORM pg_temp.insert_concept('Continuant', 'continuant', 'entity');
    PERFORM pg_temp.insert_concept('Occurrent', 'occurrent', 'entity');

    PERFORM pg_temp.insert_concept('Product', 'product', 'continuant');
    -- realizable, schema:Product

    PERFORM pg_temp.insert_concept('Source', 'source', 'continuant');
    -- quotable, attributable

    PERFORM pg_temp.insert_concept('Work', 'work', 'source', 'product'); -- citable
    -- schema:CreativeWork, bibo:Document, fabio:Expression (or Work), db:Work

    PERFORM pg_temp.insert_concept('Composite Work', 'composite-work', 'work');

    PERFORM pg_temp.insert_concept('Agent', 'agent', 'source');

    -- top entity concepts

    PERFORM pg_temp.insert_concept('Event', 'event', 'occurrent');
    -- schema:Event

    PERFORM pg_temp.insert_concept('Place', 'place', 'entity');
    -- ptop:Location, snap:Site, db:Place, schema:Place

    PERFORM pg_temp.insert_concept('Region', 'region', 'place');
    -- place with extent
    -- continent, country, city, etc.

    PERFORM pg_temp.insert_concept('Facility', 'facility', 'place', 'product');
    -- db:ArchitecturalStructure, schema:CivicStructure
    -- immobile, building

    PERFORM pg_temp.insert_concept('Artifact', 'artifact', 'product');
    -- schema:IndividualProduct

    -- works

    PERFORM pg_temp.insert_concept('Manuscript', 'manuscript', 'work'); -- published

    -- collected works

    PERFORM pg_temp.insert_concept('Article', 'article', 'work');
    -- hc:article, csl:article, schema:Article, bibo:Article, fabio:Article

    PERFORM pg_temp.insert_concept('Entry', 'entry', 'work');

    -- issued works

    PERFORM pg_temp.insert_concept('Statement', 'statement', 'work');

    PERFORM pg_temp.insert_concept('Report', 'report', 'work');
    -- bibo:Report, fabio:Report

    PERFORM pg_temp.insert_concept('Book', 'book', 'work');
    -- hc:book, csl:book, schema:Book, bibo:Book, fabio:Book

    PERFORM pg_temp.insert_concept('Issue', 'issue', 'work');
    -- hc:book, csl:book, schema:Book, bibo:Book, fabio:Book

    -- works for communication

    PERFORM pg_temp.insert_concept('Letter', 'letter', 'work');

    PERFORM pg_temp.insert_concept('Memo', 'memo', 'work');

    -- official records

    PERFORM pg_temp.insert_concept('Document', 'document', 'work');

    PERFORM pg_temp.insert_concept('Policy', 'policy', 'work');

    PERFORM pg_temp.insert_concept('Contract', 'contract', 'work');

    PERFORM pg_temp.insert_concept('Treaty', 'treaty', 'contract');

    -- technical descriptions

    PERFORM pg_temp.insert_concept('Documentation', 'documentation', 'work');

    -- legislative and legal corpora

    PERFORM pg_temp.insert_concept('Legislation', 'legislation', 'work');

    PERFORM pg_temp.insert_concept('Bill', 'bill', 'legislation');

    PERFORM pg_temp.insert_concept('Code', 'code', 'legislation');

    -- audiovisual works

    PERFORM pg_temp.insert_concept('Film', 'film', 'work');
    -- schema:Movie, bibo:Film, fabio:Film

    PERFORM pg_temp.insert_concept('Episode', 'episode', 'work');
    -- schema:Episode, po:Episode

    -- digial works

    PERFORM pg_temp.insert_concept('Web Page', 'web-page', 'work');
    -- schema:WebPage, fabio:WebPage

    -- composite-works

    PERFORM pg_temp.insert_concept('Archive', 'archive', 'composite-work');

    -- articles and entries

    PERFORM pg_temp.insert_concept('Periodical', 'periodical', 'composite-work');
    -- purl/library:Periodical, bibo:Periodical, fabio:Periodical

    PERFORM pg_temp.insert_concept('Encyclopedia', 'encyclopedia', 'composite-work');

    -- legislative and legal containers

    PERFORM pg_temp.insert_concept('Gazette', 'gazette', 'composite-work');

    -- audiovisual containers

    PERFORM pg_temp.insert_concept('Series', 'series', 'composite-work');
    -- schema:Series, po:Series

    -- digital containers

    PERFORM pg_temp.insert_concept('Web Site', 'web-site', 'composite-work');
    -- purl/library:WebSite, fabio:WebSite

    PERFORM pg_temp.insert_concept('Database', 'database', 'composite-work');

    -- event work

    PERFORM pg_temp.insert_concept('Speech', 'speech', 'work', 'event');

    PERFORM pg_temp.insert_concept('Briefing', 'briefing', 'work', 'event');

    PERFORM pg_temp.insert_concept('Hearing', 'hearing', 'work', 'event');

    PERFORM pg_temp.insert_concept('Interview', 'interview', 'work', 'event');

    PERFORM pg_temp.insert_concept('Debate', 'debate', 'work', 'event');

    -- agents

    PERFORM pg_temp.insert_concept('Person', 'person', 'agent');
    -- time_range/beginning: born/died

    PERFORM pg_temp.insert_concept('Group', 'group', 'agent');
    -- may be a folk

    PERFORM pg_temp.insert_concept('Organization', 'organization', 'group');
    -- time_range/beginning: founded/dissolved

    PERFORM pg_temp.insert_concept('Agency', 'agency', 'organization');

    PERFORM pg_temp.insert_concept('Enterprise', 'enterprise', 'organization');

    PERFORM pg_temp.insert_concept('Project', 'project', 'event', 'organization');

    -- places

    PERFORM pg_temp.insert_concept('Populated Place', 'populated-place', 'region', 'organization');
    PERFORM pg_temp.insert_concept('Country', 'country', 'populated-place');
    PERFORM pg_temp.insert_concept('Administrative District', 'administrative-district', 'populated-place');
    PERFORM pg_temp.insert_concept('Municipality', 'municipality', 'populated-place');

    -- link_types

    -- generic associations

    PERFORM pg_temp.insert_link_type(101, 'associated-with', 'associated-with', 'entity', 'entity');
    PERFORM pg_temp.insert_link_type(111, 'linked-to', 'linked-from', 'entity', 'entity');
    -- hyperlinked
    PERFORM pg_temp.insert_link_type(121, 'possibly-same-as', 'possibly-same-as', 'entity', 'entity');
    -- enable non-entity linking? Use rdf, skos or owl-core?

    -- time and space

    PERFORM pg_temp.insert_link_type(211, 'established', NULL, 'event', NULL, 11); -- void target
    PERFORM pg_temp.insert_link_type(221, 'disestablished', NULL, 'event', NULL, 11); -- void target
    PERFORM pg_temp.insert_link_type(251, 'in-place', 'place-of', 'entity', 'place');
    PERFORM pg_temp.insert_link_type(261, 'has-un-m-49-code', NULL, 'region', NULL, 21); -- void target
    PERFORM pg_temp.insert_link_type(271, 'has-iso-3166-alpha-2-code', NULL, 'region', NULL, 21); -- void target
    PERFORM pg_temp.insert_link_type(281, 'has-population', NULL, 'populated-place', NULL, 21); -- void target

    -- composition

    PERFORM pg_temp.insert_link_type(301, 'has-part', 'part-of', 'entity', 'entity');
    -- a part is inalienable, defining the whole
    PERFORM pg_temp.insert_link_type(311, 'member-of', 'has-member', 'entity', 'entity');
    -- alienable membership,  qualifies the individual
    -- NOTE: collection documents use has-collection-member/member-of-collection

    -- event participation

    PERFORM pg_temp.insert_link_type(401, 'has-participant', 'participant-in', 'event', 'agent');

    -- source relations

    PERFORM pg_temp.insert_link_type(501, 'documented-by', 'documents', 'entity', 'work');
    -- citation sources
    PERFORM pg_temp.insert_link_type(511, 'has-authority', 'authority-on', 'entity', 'agent');
    -- product relations
    PERFORM pg_temp.insert_link_type(521, 'has-creator', 'creator-of', 'product', 'agent');
    PERFORM pg_temp.insert_link_type(531, 'produced', 'produced-by', 'event', 'product');
    -- e.g. publication

    -- familial relations

    PERFORM pg_temp.insert_link_type(601, 'child-of', 'has-child', 'person', 'person');
    PERFORM pg_temp.insert_link_type(631, 'sibling-of', 'has-sibling', 'person', 'person');
    PERFORM pg_temp.insert_link_type(661, 'spouse-of', 'has-spouse', 'person', 'person');
    PERFORM pg_temp.insert_link_type(681, 'relative-of', 'has-relative', 'person', 'person');

    -- personal relations

    PERFORM pg_temp.insert_link_type(701, 'acquaintance-of', 'has-acquaintance', 'person', 'person');
    PERFORM pg_temp.insert_link_type(711, 'friend-of', 'has-friend', 'person', 'person');

    -- professional relations

    PERFORM pg_temp.insert_link_type(801, 'leader-of', 'has-leader', 'person', 'group');
    PERFORM pg_temp.insert_link_type(811, 'board-member-of', 'has-board-member', 'person', 'organization');
    PERFORM pg_temp.insert_link_type(831, 'owner-of', 'has-owner', 'agent', 'continuant');
    PERFORM pg_temp.insert_link_type(851, 'partner-of', 'has-partner', 'agent', 'agent');
    PERFORM pg_temp.insert_link_type(861, 'employee-of', 'has-employee', 'agent', 'agent');
    PERFORM pg_temp.insert_link_type(871, 'client-of', 'has-client', 'agent', 'agent');
    PERFORM pg_temp.insert_link_type(881, 'student-of', 'has-student', 'person', 'agent');

    -- intra-group relations

    PERFORM pg_temp.insert_link_type(901, 'child-organization-of', 'has-child-organization', 'group', 'group');
    PERFORM pg_temp.insert_link_type(911, 'front-for', 'has-front', 'group', 'group');

  END;
$$;

SELECT pg_temp.define_ontology();

