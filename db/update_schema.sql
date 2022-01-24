-- This is for part 3:
-- Update schema with American Kennel Club registration number and Cat Fanciers' Association registration number
-- A constraint ought to handle Dog/AKC Cat/CFA relationship. Though I likely would not do this in the database
-- I'd put business logic elsewhere

ALTER TABLE pets
  ADD COLUMN akc_number character varying(25),
  ADD COLUMN cfa_number character varying(25),
  ADD CHECK ((species::text = 'Cat'::text AND akc_number IS NULL) OR (species::text = 'Dog'::text AND cfa_number IS NULL));