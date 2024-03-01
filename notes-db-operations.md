# AGE calc in postgresql

`AGE(timestamp,timestamp);`

The AGE() function accepts two TIMESTAMP values. It subtracts the second argument from the first one and returns an interval as a result

If you want to use the current date as the first argument, you can use the following form of the AGE() function:

`AGE(timestamp);`

For example, if someone’s birth date is 2000-01-01, and the current date is 2024-01-26, their age would be:

```SELECT
  current_date,
  AGE(timestamp '2000-01-01');

  output:
current_date |       age
--------------+------------------
 2024-01-26   | 24 years 25 days
(1 row)
```

# Calculating avg age of dancers in a dance

may need to use raw SQL in prisma query to get age, or

Age("control date(i.e. 2024-01-01)" "dancer birth date") = age of dancer on 2024-01-01
