function returnHighestScore(ipptRecords){
    if (ipptRecords.length == 0) return 0
    const scoreArr = []
    for (const obj of ipptRecords){
        scoreArr.push(obj.score)
    }
    return Math.max(scoreArr)
}

export default returnHighestScore;