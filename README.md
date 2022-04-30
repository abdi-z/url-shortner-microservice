# URL Shortener Microservice
An express based url shortner microservice created using mongoose and node. The site prompts the user to enter a url and saves it in the mongodb along with a randomly generated hash. Then provides the user with the api of the same hash in the path param. When requested to such api, the express checks the database for the url saved along with such hash requested and redirects the user to that same url.

<img width="955" alt="ss1" src="https://user-images.githubusercontent.com/92116477/164985891-acc54c46-a6bc-4752-8b95-f7ac8208cf56.png">

Deployed live link available https://su-ar.herokuapp.com/

<img width="960" alt="ss2" src="https://user-images.githubusercontent.com/92116477/164985899-982a5d3a-d4a5-4808-89a2-4fb394c1b16b.png">

For example: 

https://leetcode.com/problems/add-binary/discuss/1994980/c-easy-if-else-commented-solution

can be converted to:

https://su-ar.herokuapp.com/i/7457 
