var data = require("../data/data.js")



module.exports = function (app) {

    app.post("/api/list", function (req, res) {
        res.json(data)
    });

    app.post("/api/chars", function (req, res) {
        var temp = req.body;
        var newArr = []; //request object has array of characters instead of integers
        for(var i = 0; i < temp.questions.length; i++){
            newArr.push(parseInt(temp.questions[i]))
        }
        temp.questions = newArr;
        data.push(req.body);

        res.json(calculate(newArr))
        
    });

    function calculate(questions){
        var total = 0;
        var currTotal =10000;
        var currBest;

        for(var i = 0; i < data.length-1; i++){ //don't count the latest entry
            for(var j = 0; j < questions.length; j++){
                total += Math.abs(parseInt(questions[j]) - parseInt(data[i].questions[j]))
            }

            if(currTotal > total){
                currBest = data[i];
            }
            total = 0;
        }
        return currBest;
    }


    app.post("/api/clear", function (req, res) {
        data.length = [];
        res.json({ ok: true });
    });
};
