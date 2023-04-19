const express = require("express")
const bodyParser = require("body-parser")

const users = [{
    id: 1,
    name: 'John Doe',
}, {
    id: 2,
    name: 'Jane Doe',
}]

const app = express();

// Middleware runs before every request
app.use(bodyParser.json())

app.get('/users/:id', (req, res) => {
    /* Parsed the input */
    const id = parseInt(req.params.id);
    
    let matchingUser;

    /* Find the user with the matching id */

    // Initalize a counter. Statement to determine when for loop is over. Afterthought - what you do after each iteration.
    for (let i = 0; i < users.length; i++){
        // Current user in the for loop
        const currentUser = users[i]

        // If the current user's id matches the id in the url
        // Store in matchingUser
        if (currentUser.id === id){
            matchingUser = currentUser;
            break
        }
    }
    
    if (matchingUser === undefined){
        res.status(404);
        return res.end();
    }

    /* Send the user back to the client */
    res.send(matchingUser)
})

// Creating users
/*
curl -v -X POST \                                                                                                        ⬡ 16.19.1 
http://localhost:4872/users \
 -H 'Content-Type: application/json' \
-d "{ \"name\": \"john\" }"
*/

app.post('/users', (req, res)=>{
    const name = req.body.name;
    if(name === undefined){
        res.status(400)
        res.end()
        return
    }

    /* Find the highest id in the array */
    /*
      does the same as below (for of)
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
      }
    */
    let highestUserId = 0;
   
    for(const user of users) {
        if (user.id > highestUserId){
            highestUserId = user.id;
        }
    }

    let newUserId = highestUserId + 1;
    const newUser = {
        id: newUserId,
        name: name,
    }

    users.push(newUser);

    res.status(201)
    res.send(newUser)
})


// Add a delete user endpoint
app.delete('/user/:name',(req,res)=> {
    const name = req.body.name
    if(name === undefined){
        res.status(400)
        res.end()
    } else {
        res.send('User Deleted!')
    }

})


// Add a put user endpoint
app.put('/user/:name', (req,res) =>{
    res.send('updated user')
})

// add a patch user endpoint
app.patch('/user', (req,res) =>{
    res.send('User has been patched')
})


app.listen(4872, () => {
    console.info('listening on port 4872')
})