var db=require("../connection/connection")
var bcrypt=require("bcrypt")
var collection=require("../connection/collection")


module.exports={

    physicsPdf:()=>{
        return new Promise(async(resolve,reject)=>{
            let physicsData=await db.get().collection(collection.NOTES_PHYSICS).find().toArray()
            resolve(physicsData)
        })
    },

    chemistryPdf:()=>{
        return new Promise(async(resolve,reject)=>{
            let chemistryData=await db.get().collection(collection.NOTES_CHEMISTRY).find().toArray()
            resolve(chemistryData)
        })
    },

    mathPdf:()=>{
        return new Promise(async(resolve,reject)=>{
            let mathData=await db.get().collection(collection.NOTES_MATHS).find().toArray()
            resolve(mathData)
        })
    },
    SubmitChemistry:(assignment)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.ASSIGNMENT_CHEMISTRY).insertOne(assignment).then((response)=>{
                resolve(response.insertedId)
                
            })
        })
    }

    
                    

}