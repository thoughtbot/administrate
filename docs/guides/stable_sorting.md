---
title: Stable Sorting
---

The display order of `index` pages and `HasMany` fields is controlled by `Administrate::Order`.
By default, both are set to `nil`, so the model's default sort order is applied.

You can toggle sorting by clicking on a table header attribute. When sorting by a specific attribute, a tiebreaker is used to ensure stable sorting.

The tiebreaker uses the table's primary key.
The generated SQL looks like this:

```sql
-- When toggling the name attribute
select * from users order by name desc, id desc;

-- When toggling the name attribute again
select * from users order by name asc, id asc;
```

If there is no primary key (such as in a join table), the tiebreaker is not used.

```sql
-- When toggling the name attribute
select * from users order by name desc;
```
