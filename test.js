request = JSON.parse(pm.request.body.raw);
response = pm.response.json();;

pm.test("verify shipping fee returned in response is correct", function () {
    if (request.selectedShipping == "standard") {
        if (request.membershipActive == true) {
            pm.expect(response.shippingFee).to.eql(0);
        }
        else {
            if (request.amount < 35) {
                pm.expect(response.shippingFee).to.eql(13.99);
            }
            else {
                pm.expect(response.shippingFee).to.eql(0);
            }
        }
    }
    else if (request.selectedShipping == "prime") {
        if (request.membershipActive == true) {
            pm.expect(response.shippingFee).to.eql(0);
        }
        else {
            pm.expect(response.shippingFee).to.eql(24.99);
        }
    }
});

pm.test("verify values of selected shipping are valid in request payload", function () {
    pm.expect(request.selectedShipping).to.be.oneOf(['standard','prime']);
});

pm.test("verify response is 415 if content type of request is not json/application", function () {
    console.log(pm.request.headers.all())
    requestHeaders = pm.request.headers.all();
    for(let i = 0; i < requestHeaders.len; i++) {
        if(requestHeaders[i].key == 'Content-Type' & requestHeaders[i].value != 'json/application') {
                pm.response.to.have.status(415);
        }
    }
});
