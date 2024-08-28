
const responseHandler = {
    clientError: (res, message)=>{
        res.status(400).json({
            status: "fail",
            message: message
        })
    },

    success: (res,  data, count)=>{
        res.status(200).json({
            status: "success",
            data: data,
            dataCount: count
        })
    }, 

    created: (res)=>{
        res.status(201).json({
            status: "success",
            message: "Operation completed successfully"
        })
    },

    ok: (res)=>{
        res.status(204).json({
            status: "success",
        })
    },

    unauthorized: (res, message)=>{
        res.status(401).json({
            status: "fail",
            message
        })
    },

    notfound: (res, message)=>{
        res.status(404).json({
            status: "fail",
            message
        })
    },

    unprocessable: (res, message)=>{
        res.status(422).json({
            status: "fail",
            message
        })
    },

    forbidden: (res, message)=>{
        res.status(403).json({
            status: "fail",
            message
        })
    },

    networkError: (res, message)=>{
        res.status(503).json({
            status: "fail",
            message: "Network Error coming from the backend (Change later)"
        })
    }
}


module.exports = {responseHandler}