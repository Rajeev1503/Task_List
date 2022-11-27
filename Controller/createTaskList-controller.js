const { check, validationResult } = require("express-validator");

//required schemas
const TaskList = require("../model/TaskList");


exports.showAllTaskList = async (req,res)=> {
    const allTaskList = await TaskList.find({});
    if(!allTaskList){
    res.status(404).json({
        error: "Task not Found"
    })
    }
    
    res.render("index", { allTaskList });
}

exports.createTaskList = (req,res, next)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({error : errors.array()[0].msg});
    }

    const newTaskList = new TaskList(req.body);
    newTaskList.save((err)=>{
        if(err) {
            return res.status(400).json({
                error: "Creating New Task List Failed"
            })
        }

        res.redirect('/createTaskList');
    })

    // next();
}

// const checkForActive = ()=>{

// }


exports.deleteTaskList = (req,res)=> {

}