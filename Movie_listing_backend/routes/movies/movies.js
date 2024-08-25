
const express = require("express");
const router = express.Router();
const Movie=require("../../db/schemas/movieschema");

router.get("/",async(req,res)=>{
   const queryParams = req.query;
   const filters={};
   if(queryParams.name){
    filters.name={
        $regex:`^${queryParams.name}`,$options:"i",
    };
   }
   if(queryParams.rating){
    filters.rating={
        $gte:parseFloat(queryParams.rating),
    };
   }
    const movies = await Movie.find(filters);

   res.json(movies);
});

router.get("/:id",async(req,res)=>{
    try{
        const moviesId= req.params.id;
        const movie =await Movie.findById(moviesId);

    res.json({
        message:"Movie found successfully",
    });
}
  catch(error){
    if(error.kind ==="ObjectId"){
        res.status(404).json({message:"Movie not found"});  
    }
        else{
        res.status(500).json({message:"Internal source error"}); 
     }

}
});


router.post("/",async(req,res)=>{
    try{
     console.log(req.body);
     const moviesdata = req.body;
    const newMovie = new Movie(moviesdata);
    await newMovie.save();
    res.json({
        message:"Movie uploaded successfully",
    });
}
  catch(error){
    console.log(error);
    res.status(500).json({
       message:"error",
    });
}
});

router.put("/:id",async(req,res)=>{
    try{
    const moviesId= req.params.id;
    const updatemovie=req.body;
    await Movie.findByIdAndUpdate(moviesId,updatemovie);
    res.json({
        message:"Movie updated successfully",
    });
}
  catch(error){
    console.log(error);
    res.status(500).json({
       message:"error",
    });
}
});
router.delete("/:id",async(req,res)=>{
    try{
        const moviesId= req.params.id;
        const deletemovie=req.body;
        await Movie.findByIdAndDelete(moviesId,deletemovie);
    
    res.json({
        message:"Movie deleted successfully",
    });
}
  catch(error){
     console.log(error);
     res.status(500).json({
      message:"error",
    });
}
});


module.exports = router;