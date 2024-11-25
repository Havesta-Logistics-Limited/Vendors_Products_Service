
const responseHandler = {
    clientError: (res, message)=>{
        res.status(400).json({
            success: false,
            message: message
        })
    },

    success: (res,  data, count)=>{
        res.status(200).json({
            success: true,
            data: data,
            dataCount: count
        })
    }, 

    created: (res)=>{
        res.status(201).json({
            success: true,
            message: "Operation completed successfully"
        })
    },

    ok: (res, message = "Action completed")=>{
        res.status(204).json({
            success: true,
            message
        })
    },

    unauthorized: (res, message)=>{
        res.status(401).json({
            success: false,
            message
        })
    },

    notfound: (res, message)=>{
        res.status(404).json({
            success: false,
            message
        })
    },

    unprocessable: (res, message)=>{
        res.status(422).json({
            success: false,
            message
        })
    },

    forbidden: (res, message)=>{
        res.status(403).json({
            success: false,
            message
        })
    },

    networkError: (res, message)=>{
        res.status(503).json({
            success: false,
            message: "Network Error coming from the backend (Change later)"
        })
    }
}


module.exports = {responseHandler}