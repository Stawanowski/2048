const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

const fetchScores = async () => {
    try{
        const scores = await db.score.findMany({
            orderBy: [
                {
                    score: 'desc'
                }
            ]
        });
        return scores;
    }catch(err){
        console.error('Fetching failed.');
        return 1;
    }
}
const addScore = async (name, score) => {
    try{
        const parsedScore = parseInt(score)
        console.log(name,score)
        await db.score.create({
            data: {
              score: parsedScore,
              name: `${name}`,
            },
          });
        return 0;
    }catch(err){
        console.error(err);
        return 1;
    }
}
module.exports = {fetchScores, addScore}
