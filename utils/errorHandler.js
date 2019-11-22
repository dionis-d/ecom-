function catchErrors(res, err) {
    res.status.json({
        success: false,
        message: err.message ? err.message : err
    });
}

module.exports = catchErrors;