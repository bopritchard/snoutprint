-- This is for part 5:
-- Write a query to get the number of records uploaded per month since we've gone live in analytics.sql in the db directory.
SELECT date_trunc('month', created_at), count(*)
FROM records
GROUP BY 1
ORDER BY 1