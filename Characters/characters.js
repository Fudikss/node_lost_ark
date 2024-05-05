const { default: axios } = require("axios");
const { Router, response } = require("express");
const cheerio = require("cheerio");
const router = Router();
require('dotenv').config();

const public_url = process.env.Public_Url;
const api_key = process.env.Ark_Api_Key;

/**캐릭터 프로필 가져오기**/
router.post("/get_characters_profile/:data", async (req, res)=> {
    console.log("캐릭터 프로필 Get");

    const characters_nick_name = req.body.nick_name;

    const results = await Promise.all([
        axios.get(public_url+`/armories/characters/${characters_nick_name}/profiles`,{
            headers: {
                'Authorization': `Bearer ${api_key}`
            }
        }),
        axios.get(public_url+`/armories/characters/${characters_nick_name}/equipment`,{
            headers: {
                'Authorization': `Bearer ${api_key}`
            }
        }),
        axios.get(public_url+`/armories/characters/${characters_nick_name}/cards`,{
            headers: {
                'Authorization': `Bearer ${api_key}`
            }
        }),
    ]);


    var res_data = [];


    results.forEach(result =>{
        res_data.push(result.data);
    })

    if(res_data[0] != null){

        for(var i = 0; i < res_data[1].length; i++){
            
            res_data[1][i]["Tooltip"] = JSON.parse(res_data[1][i]["Tooltip"]);


            Object.entries(res_data[1][i]["Tooltip"]).forEach(([key, item])=>{

                if(typeof item["value"] == "string"){

                    const par_text = cheerio.load(item["value"])

                    res_data[1][i]["Tooltip"][key]["value"] = par_text.text();
                }
            });
        }


        res.json({"result" : res_data});

    }else{

        res.json({"result" : []});
    }
});



/**캐릭터 카드 가져오기**/
router.post("/get_characters_card/:data", async (req, res)=> {
    console.log("캐릭터 카드 Get");

    const characters_nick_name = req.body.nick_name;

    const results = await Promise.all([
        axios.get(public_url+`/armories/characters/${characters_nick_name}/cards`,{
            headers: {
                'Authorization': `Bearer ${api_key}`
            }
        }),
    ]);

    var res_data = [];

    results.forEach(result =>{
        res_data.push(result.data);
    })

    console.log(res_data[0]["Cards"]);
    console.log(res_data[0]["Effects"]);
    console.log(res_data[0]["Effects"][0]["Items"]);


    // for(var i = 0; i < res_data[0].length; i++){
        
    //     res_data[0][i]["Tooltip"] = JSON.parse(res_data[0][i]["Tooltip"]);


    //     Object.entries(res_data[0][i]["Tooltip"]).forEach(([key, item])=>{

    //         if(typeof item["value"] == "string"){

    //             const par_text = cheerio.load(item["value"])

    //             res_data[0][i]["Tooltip"][key]["value"] = par_text.text();
    //         }
    //     });
    // }


    res.json({"result" : ""});
});



module.exports = router;