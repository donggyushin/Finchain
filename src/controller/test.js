export const testGet = (req, res) => {
    res.json({
        test: 'hi!'
    })
}

export const testPost = (req, res, next) => {
    console.log(req.body)
    res.json({
        data: req.body
    })
}