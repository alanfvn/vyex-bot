--Sequence creation.
CREATE SEQUENCE vyexbot_word_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Table creation.
CREATE TABLE vyexbot(
	word_id integer DEFAULT nextval('vyexbot_word_id_seq'::regclass) NOT NULL,
	word text
);


ALTER TABLE vyexbot ADD CONSTRAINT unique_word UNIQUE (word);

-- Function to return random words.

CREATE FUNCTION get_random_word(amount integer) 
	RETURNS TABLE(wid integer, wrd text)
	AS $$
BEGIN
	RETURN QUERY SELECT CAST(word_id as int), word FROM 
	(SELECT FLOOR(random()*(SELECT COUNT(*) FROM vyexbot)+1) 
	 AS  ROW_NUMBER FROM generate_series(1, amount)) rwr JOIN (SELECT *, row_number() over () 
	 FROM vyexbot) original USING (row_number);						 
END; 
$$ LANGUAGE plpgsql