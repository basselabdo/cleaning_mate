-- List all queries needed in the project

-- insert new clients
INSERT INTO clients
  (first_name,last_name,phone_number,email,password,address)
VALUES
  ('alex', 'falco', 5148350149, 'afalconer02@gmail.com', '12345', '221 St-Jacques Montreal');


-- update existing client
UPDATE clients
SET first_name = newFirstName, last_name = newLastName, phone_number = newPhone, email = newEMail, password = newPassword, adress = NewAdress
WHERE id = IdToUpdate

-- insert new providers
INSERT INTO providers
  (first_name,last_name,phone_number,email,password,address)
VALUES
  ('alex', 'falco4', 5148350149, 'afalconer02@gmail.com', '12345', '221 St-Jacques Montreal');

-- update existing providers
UPDATE providers
SET first_name = newFirstName, last_name = newLastName, phone_number = newPhone, email = newEMail, password = newPassword, adress = NewAdress, max_distance= newMaxDistance
WHERE id = IdToUpdate

-- insert new Appointments
INSERT INTO appointments
  (date,start_time,hours,booked,cost_per_hour,comment,rating,client_id,provider_id)
VALUES
  ('2020-03-03', 12, 1, false, 15, null, null, null, 2);

-- Update existing Appointments   when you book, rate, comment || when you change $/hour
UPDATE appointments
SET date = ,start_time= ,hours= ,booked = ,cost_per_hour =,comment =,rating= ,client_id= ,provider_id= 
WHERE id = IdToUpdate

--Delete existing Appointments, you can only delete appointments that are not yet booked
DELETE FROM appointments WHERE id= IdToDelete and booked=false;


-- history of appointments for clients // modifications needed if not using 1 hour appointments
SELECT *
FROM appointments as a
  JOIN providers as b on a.provider_id = b.id
WHERE a.client_id = ID_selected


--history of appointments for providers // modifications needed if not using 1 hour appointments
SELECT *
FROM appointments as a
  JOIN clients as b on a.client_id = b.id
WHERE a.provider_id = ID_selected


-- Identify cleaners that are available as per selection from the client
-- 1. select all appointments not booked in the client's selection
-- 2. Count the number of appointments per providers
-- 3. filter to keep providers when the number in #2 is >= the hours selected by the customer
-- 4. return the available providers and theirs ratings

SELECT *

FROM (
  SELECT provider_id, count(hours) as hours, avg(cost_per_hour)::numeric(10,2) as cost_per_hour
      FROM appointments
      WHERE booked = false and date = '2020-03-03' and start_time >= 10 and start_time <= (10)
      GROUP BY provider_id ) as view1
  JOIN providers as b on view1.provider_id = b.id

  LEFT JOIN (
        SELECT provider_id, avg(rating)::numeric  (10, 2) as rating
        FROM appointments
WHERE date <= now() - interval
'1 day'
        GROUP by provider_id) as view2 on  view1.provider_id = view2.provider_id
      
      
        WHERE view1.hours >= 1;








SELECT view1.provider_id as provider_id, first_name, hours, cost_per_hour, lat, lon, view2.rating
FROM (
  SELECT a.provider_id as provider_id, b.first_name, count(hours) as hours, avg(cost_per_hour)::numeric(10,2) as cost_per_hour, lat ,lon 
      FROM appointments as a
  JOIN providers as b on a.provider_id = b.id
WHERE booked = false and date = '2020-03-03' and start_time >= 10 and start_time <= (11)
GROUP BY a.provider_id,b.first_name, lat,lon
) as view1
      LEFT JOIN
(
        SELECT provider_id, avg(rating)
::numeric
(10,2) as rating
        FROM appointments
        WHERE date <= now
() - interval '1 day'
        GROUP by provider_id) as view2 on  view1.provider_id = view2.provider_id
        WHERE view1.hours >= 1;