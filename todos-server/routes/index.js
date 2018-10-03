module.exports = function(app, Todo)
{
    // GET ALL BOOKS
    app.get('/api/todos', function(req,res){
        Todo.find(function(err, todos){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(todos);
        })
    });

    // GET SINGLE TODO
    app.get('/api/todos/:todo_id', function(req, res){
        Todo.findOne({_id: req.params.todo_id}, function(err, todo){
            if(err) return res.status(500).json({error: err});
            if(!todo) return res.status(404).json({error: 'todo not found'});
            res.json(todo);
        })
    });

    // GET TODO BY AUTHOR
    app.get('/api/todos/author/:author', function(req, res){
        Todo.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, todos){
            if(err) return res.status(500).json({error: err});
            if(todos.length === 0) return res.status(404).json({error: 'todo not found'});
            res.json(todos);
        })
    });

    // CREATE TODO
    app.post('/api/todos', function(req, res){
        var todo = new Todo();
        todo.name = req.body.name;
        todo.published_date = new Date();

        todo.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json(todo);

        });
    });

    // UPDATE THE TODO
    app.put('/api/todos/:todo_id', function(req, res){
        Todo.update({ _id: req.params.todo_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'todo not found' });
            res.json( todo );
        })
    /* [ ANOTHER WAY TO UPDATE THE TODO ]
            Todo.findById(req.params.todo_id, function(err, todo){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!todo) return res.status(404).json({ error: 'todo not found' });

            if(req.body.title) todo.title = req.body.title;
            if(req.body.author) todo.author = req.body.author;
            if(req.body.published_date) todo.published_date = req.body.published_date;

            todo.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'todo updated'});
            });

        });
    */
    });

    // DELETE TODO
    app.delete('/api/todos/:todo_id', function(req, res){
        Todo.remove({ _id: req.params.todo_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "todo not found" });
            res.json({ message: "todo deleted" });
            */

            res.status(204).end();
        })
    });
     
}
