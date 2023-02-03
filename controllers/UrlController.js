const shortId = require("shortid");
const urlModel = require("../models/UrlModel.js");

const createUrl = async (req, res) => {
  try {

    let {urlCode, longUrl, shortUrl} = req.body;

    //validation for data inputs by users

    if (Object.keys(req.body).length == 0)
      {return res.status(400).send({ message:"All fields are empty"});}
    if (!longUrl)
      {return res.status(400).send({ message:"please enter long url"});}

    // using regex pattern to validate url

    const validateUrl =(value)=>{
        let urlRegex = /^(?:(?:(?:https?|http):)?\/\/.*\.(?:png|gif|webp|com|in|org|co|co.in|net|jpeg|jpg))/i;
        if(!urlRegex.test(value)){return res.status(400).send({message:"please enter a valid url"})}
    }

    //checking for duplicate url which is already present

    let duplicateShortUrl = await urlModel.findOne(
        { $or: [{ urlCode: urlCode }, { longUrl: longUrl }] });
    if (duplicateShortUrl)
      return res.status(400).send({ message: "Short url already created" });

    let shortCode = shortId.generate().toLocaleLowerCase();

    urlCode=shortCode;
    shortUrl = "http://localhost:3000/"+shortCode;

    let data = await urlModel.create({urlCode:urlCode ,shortUrl:shortUrl,longUrl:longUrl});
    return res.status(201).send({message:data});

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createUrl };
