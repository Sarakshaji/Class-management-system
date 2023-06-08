var db=require("../connection/connection")
var bcrypt=require("bcrypt")
var collection=require("../connection/collection")
var objectId=require('mongodb').ObjectId

 module.exports={
    
     Login:(userData)=>{
        //console.log(userData)
         return new Promise(async(resolve,reject)=>{
            let loginstatus=false
            let response={}
             let user=await db.get().collection('admin').findOne({username:userData.username})
             if(user)
             {
                let user1=await db.get().collection('admin').findOne({password:userData.password})
                if(user1)
                 {
                    
                     response.user=user
                     response.status=true
                     
                     resolve(response)
                 }
                 else{
                     console.log("password is not working")
                     resolve({status:false})
                 }

                

             }
             else{
                 console.log("error occuard")
                 resolve({status:false})
             }

         })
     },

     StudentDeatails:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection('student').insertOne(userData).then((response)=>{
               
                resolve(response.insertedId)
            })

        })
    },
    StudentLogin:(userData)=>{
        
        return new Promise(async(resolve,reject)=>{
           let loginstatus=false
           let response={}
        let student1=await db.get().collection(collection.STUDENT_DATA).findOne({username:userData.username})
        
            if(student1){
                bcrypt.compare(userData.password,student1.password).then((status)=>{
                    if(status){
                        console.log("login success")
                        response.student=student1
    
                        response.status=true
                        resolve(response)
                        

                    }
                    else{
                        console.log(student1.password)
                        console.log("password is wrong")
                        resolve({stasus:false})
                    }
                })
            }
            else{
               
                console.log("username is not correct")
                resolve({status:false})
            
                
            }
        })
    },

    getProduct:()=>{
        return new Promise(async(resolve,reject)=>{
        let product=await db.get().collection(collection.STUDENT_DATA).find().toArray()
        resolve(product)
        })
    },

    sendPhysics:(userId)=>{
        console.log("userId",userId)
        
        return new Promise(async(resolve,reject)=>{
          await db.get().collection(collection.NOTES_PHYSICS).insertOne(userId).then((response)=>{
                
                resolve(response.insertedId)
                
            })
        })
    },

    sendChemistry:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.NOTES_CHEMISTRY).insertOne(userId).then((response)=>{
                resolve(response.insertedId)
            })
        })
    },

    sendMaths:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.NOTES_MATHS).insertOne(userId).then((response)=>{
                resolve(response.insertedId)
            })
        })
    },

    GetAssignmentChemistry:()=>{
        return new Promise(async(resolve,reject)=>{
            assignmentChemistry=await db.get().collection(collection.ASSIGNMENT_CHEMISTRY).find().toArray()
            resolve(assignmentChemistry)
        })
    },

    EditDetails:(userid)=>{
        return new Promise((resolve,reject)=>{
           db.get().collection('student').findOne({_id:new objectId(userid)}).then((student)=>{
            resolve(student)
           }) 
        })

    },

    UpdateStudent:(studentId,student)=>{
        return new Promise(async(resolve,reject)=>{
          await  db.get().collection('student').updateOne({_id:new objectId(studentId)},{
                $set:{
                    firstname:student.firstname,
                    lastname:student.lastname,
                    username:student.username,
                    email:student.email
                }
            }).then((response)=>{
                resolve()
            })
        })
    },

    Deleteitem:(Deleteid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('student').deleteOne({_id:new objectId(Deleteid)}).then((response)=>{
                resolve(response)
                console.log(response)
            })
            
        })
    }


}


