const { default: axios } = require("axios");
const { Router, response } = require("express");
const router = Router();
require('dotenv').config();

const public_url = process.env.Public_Url;
const api_key = process.env.Ark_Api_Key;


/**공지사항 가져오기 */
router.get("/get_notices", (req, res)=>{
    console.log("공지사항 Get");

    axios.get(public_url+"/news/notices", {
        headers: {
          'Authorization': `Bearer ${api_key}`
        },
        params: {
          limit: 3  
        }
    })
    .then(response => {
        res.json({"result" : response.data.slice(0, 3)})
    })
    .catch(error => {
        console.log("공지사항 Get 에러 발생");
    })

});


/**이벤트 가져오기 */
router.get("/get_events", (req, res)=>{
    console.log("이벤트 Get");

    axios.get(public_url+"/news/events", {
        headers: {
            'Authorization': `Bearer ${api_key}`
        }
    })
    .then(response => {
        // console.log(response.data);
        res.json({"result" : response.data})
    })
    .catch(error => {
        console.log("이벤트 Get 에러 발생");
    })

});


module.exports = router;

