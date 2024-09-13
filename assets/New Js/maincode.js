var userAddress = '';
var contractBalanceRate = 0;
var userPercentRate = 0;
var userAvailable = 0;
var userTotalDeposits = 0;
var userTotalWithdrawn = 0;
var userAmountOfDeposits = 0;
var userLastDepositTime = 0;
console.log("MainCode js file calling succesful");

function getFormattedDate(date) {
    let hour = ('0' + date.getUTCHours()).slice(-2);
    let minute = ('0' + date.getUTCMinutes()).slice(-2);
    let day = ('0' + date.getUTCDate()).slice(-2);
    let month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    let year = date.getUTCFullYear();
    return hour + ':' + minute + ' ' + day + '.' + month + '.' + year
}

function getFormattedNumber(num) {
    var num = num + '';
    var value = Number(num);
    var res = num.split('.');
    if (res[0].length <= 2) {
        return value.toFixed(6)
    } else if (res[0].length == 3) {
        return value.toFixed(5)
    } else if (res[0].length == 4) {
        return value.toFixed(4)
    } else if (res[0].length == 5) {
        return value.toFixed(3)
    } else if (res[0].length == 6) {
        return value.toFixed(2)
    } else if (res[0].length == 7) {
        return value.toFixed(1)
    } else if (res[0].length >= 8) {
        return value.toFixed(0)
    }
}

var abi =  [{
   "outputs":[{"type":"uint256"}],"constant":true,"name":"PERCENTS_DIVIDER","stateMutability":"View","type":"Function"},{"payable":true,"inputs":[{"name":"referrer","type":"address"}],"name":"invest","stateMutability":"Payable","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserDividends","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserAvailable","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserPercentRate","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"PROJECTFUND","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"TIME_STEP","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferrer","stateMutability":"View","type":"Function"},{"name":"withdraw","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"projectAddress","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalWithdrawn","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalInvested","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"type":"uint256"}],"name":"REFERRAL_PERCENTS","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"BASE_PERCENT","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"CONTRACT_BALANCE_STEP","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"getContractBalance","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalDeposits","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"type":"address"}],"name":"userReferralBonus","stateMutability":"View","type":"Function"},{"outputs":[{"type":"bool"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"isActive","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"marketingAddress","stateMutability":"View","type":"Function"},{"outputs":[{"name":"checkpoint","type":"uint256"},{"name":"referrer","type":"address"},{"name":"bonus","type":"uint256"},{"name":"updateTime","type":"uint256"}],"constant":true,"inputs":[{"type":"address"}],"name":"users","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"MARKETINGFUND","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalUsers","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"},{"type":"uint256"},{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"},{"name":"index","type":"uint256"}],"name":"getUserDepositInfo","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"type":"address"}],"name":"userWithdrawn","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"_level","type":"uint256"}],"name":"getLevalReward","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserCheckpoint","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"INVEST_MIN_AMOUNT","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserReferralBonus","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUserTotalWithdrawn","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"getContractBalanceRate","stateMutability":"View","type":"Function"},{"inputs":[{"name":"marketingAddr","type":"address"},{"name":"projectAddr","type":"address"}],"stateMutability":"Nonpayable","type":"Constructor"},{"inputs":[{"name":"user","type":"address"}],"name":"Newbie","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"amount","type":"uint256"}],"name":"NewDeposit","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"amount","type":"uint256"}],"name":"Withdrawn","type":"Event"},{"inputs":[{"indexed":true,"name":"referrer","type":"address"},{"indexed":true,"name":"referral","type":"address"},{"indexed":true,"name":"level","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"RefBonus","type":"Event"},{"inputs":[{"indexed":true,"name":"user","type":"address"},{"name":"totalAmount","type":"uint256"}],"name":"FeePayed","type":"Event"},{"inputs":[{"name":"sender","type":"address"},{"name":"amount","type":"uint256"}],"name":"Reinvest","type":"Event"
}]



$(function () {

    setTimeout(()=>{
        tronWeb.trx.getBalance(contractAddress).then(result => {
            let balance = tronWeb.toDecimal(result) / 1000000;
            let b = parseFloat(getFormattedNumber(balance));
            $('.contractBalance').html(b);
        })

        loadTrasaction();
    },500)

    let search = window.location.search;

    function GetQueryValue(queryName) {
        var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
        var r = search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }
    }

    const ref = GetQueryValue("ref");
    console.log("ref===", ref)

    localStorage.setItem("ref", ref || refererDefault);

    function setUserAddress(address) {
        $('.trxWallet').val(address);
        $('.trxWalletTa125').html('<a href="https://www.tronking.live/?ref=' + address + '"><img src="https://tronsense.net/img/125.gif" width="125" height="125" alt="tronsense.net | Get +200% up to your deposit right now. Safe and legit!"></a>');
        $('.trxWalletTa468').html('<a href="https://www.tronking.live/?ref=' + address + '"><img src="https://tronsense.net/img/125.gif" width="468" height="60" alt="tronsense.net | Get +200% up to your deposit right now. Safe and legit!"></a>');
        $('.trxWalletTa728').html('<a href="https://www.tronking.live/?ref=' + address + '"><img src="https://tronsense.net/img/125.gif" width="728" height="90" alt="tronsense.net | Get +200% up to your deposit right now. Safe and legit!"></a>');
        $('.reflink').html('https://www.tronking.live/?ref=' + address);
        $('#reflink').val('https://www.tronking.live/?ref=' + address)
    }

    var obj = setInterval(async () => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            clearInterval(obj);
            userAddress = window.tronWeb.defaultAddress.base58;
            $('.authFalse').hide();
            $('.authTrue').attr('style', 'display:block !important');
            setUserAddress(userAddress);
            updateFull();
            setTimeout(function () {
                var accountInterval = setInterval(async () => {
                    if (window.tronWeb.defaultAddress.base58 !== userAddress) {
                        userAddress = window.tronWeb.defaultAddress.base58;
                        setUserAddress(userAddress);
                        updateFull()
                    }
                }, 100)
            }, 5000)
        }
    }, 10);

    async function invest(n) {
        var amount = parseFloat($('.trxAmount' + n).val().replace(',', '.'));
        if (!amount) {
            $('.trxAmountError' + n + '1').show()
        } else if (amount < 100) {
            $('.trxAmountError' + n + '2').show()
        } else {
            amount = Math.floor(amount * 1000000);
            if (!tronWeb.isAddress(userReferer)) {
                userReferer = refererDefault
            }
            let _userReferer = localStorage.getItem("ref") || refererDefault

            console.log("_userReferer===", _userReferer)

            try {
                let instance = await tronWeb.contract(abi, contractAddress);
                let res = await instance.invest(_userReferer).send({callValue: amount});
                if (!$('div[data-remodal-id="wallet"]').is(':visible')) {
                    $('#goToWallet').trigger('click')
                }
                setTimeout(function () {
                    updateFull()
                }, 5000)
            } catch (error) {
            }
        }
    }

    $(".investButton1").click(function (e) {
        e.preventDefault();
        invest(1);
        return false
    });
    $(".investButton2").click(function (e) {
        e.preventDefault();
        invest(2);
        return false
    });
    $('.trxAmount1').on('input', function () {
        $('.trxAmountError11').hide();
        $('.trxAmountError12').hide()
    });
    $('.trxAmount2').on('input', function () {
        $('.trxAmountError21').hide();
        $('.trxAmountError22').hide()
    });

    async function withdraw() {
        try {
            let instance = await tronWeb.contract(abi, contractAddress);
            let res = await instance.withdraw().send({callValue: 0});
            if (!$('div[data-remodal-id="wallet"]').is(':visible')) {
                $('#goToWallet').trigger('click')
            }
            setTimeout(function () {
                updateFull()
            }, 5000)
        } catch (error) {
        }
    }

    $(".withdrawButton").click(function (e) {
        e.preventDefault();
        withdraw();
        return false
    });

    async function getContractBalanceRate() {
        let instance = await tronWeb.contract(abi, contractAddress);
        let res = await instance.getContractBalanceRate().call();
        contractBalanceRate = tronWeb.toDecimal(res);
        contractBalanceRate = (contractBalanceRate - 10) / 10;
        contractBalanceRate = contractBalanceRate.toFixed(1);
        $('.contractBalanceRate').html('+' + contractBalanceRate + '%')
    }

    async function getUserPercentRate() {
        await getContractBalanceRate();
        let instance = await tronWeb.contract(abi, contractAddress);
        let res = await instance.getUserPercentRate(userAddress).call();
        userPercentRate = tronWeb.toDecimal(res);
        userPercentRate = userPercentRate / 10;
        userPercentRate = userPercentRate.toFixed(1);
        $('.userPercentRate').html('+' + userPercentRate + '%');
        var basicPercentRate = 1;
        basicPercentRate = basicPercentRate.toFixed(1);
        holdPercentRate = userPercentRate - contractBalanceRate - basicPercentRate;
        holdPercentRate = holdPercentRate.toFixed(1);
        $('.holdPercentRate').html('+' + holdPercentRate + '%');
        $('.basicPercentRate').html('+' + basicPercentRate + '%')
    }

    async function getUserAvailable() {
        let instance = await tronWeb.contract(abi, contractAddress);
        let res = await instance.getUserAvailable(userAddress).call();
        userAvailable = tronWeb.toDecimal(res);
        userAvailableTrx = userAvailable / 1000000;
        userAvailableTrx = parseFloat(getFormattedNumber(userAvailableTrx));
        $('.userAvailable').html(userAvailableTrx)
    }
    console.log("test case 2");
    async function getUserTotalDeposits() {
        console.log("test case 3.1");
        const instance = await tronWeb.contract(abi, contractAddress);
        console.log("test case 4");
        const res = await instance.getUserTotalDeposits(userAddress).call();
        console.log("test case 3 Investment Total amount :",res);
        const userTotalDepositsconst = tronWeb.toDecimal(res);
    const userTotalDepositsTrxconst = userTotalDepositsconst / 1000000;
    userTotalDepositsTrxconst = parseFloat(getFormattedNumber(userTotalDepositsTrxconst));
        $('.userTotalDeposits').html(userTotalDepositsTrxconst)
        console.log("test case 5");
    }

    async function getUserTotalWithdrawn() {
        await getUserAvailable();
        let instance = await tronWeb.contract(abi, contractAddress);
        let res = await instance.getUserTotalWithdrawn(userAddress).call();
        userTotalWithdrawn = tronWeb.toDecimal(res);
    }

    async function getUserAmountOfDeposits() {
        let instance = await tronWeb.contract(abi, contractAddress);
        let res = await instance.getUserAmountOfDeposits(userAddress).call();
        userAmountOfDeposits = tronWeb.toDecimal(res);
        $('.userAmountOfDeposits').html(userAmountOfDeposits)
    }

    async function getUserLastDepositTime() {
        await getUserAmountOfDeposits();
        if (userAmountOfDeposits > 0) {
            let instance = await tronWeb.contract(abi, contractAddress);
            let res = await instance.getUserDepositInfo(userAddress, userAmountOfDeposits - 1).call();
            userLastDepositTime = tronWeb.toDecimal(res[2]);
            userLastDepositTimeFormatted = getFormattedDate(new Date(userLastDepositTime * 1000));
            $('.userLastDepositTime').html(userLastDepositTimeFormatted);
            $('.withdrawButton').prop('disabled', false);
            $('.withdrawButton').css('cursor', 'pointer');
            $('.withdrawButton').attr('title', '')
        } else {
            $('.userLastDepositTime').html('no deposits');
            $('.withdrawButton').prop('disabled', true);
            $('.withdrawButton').css('cursor', 'not-allowed');
            $('.withdrawButton').attr('title', 'Please make deposit first!')
        }
    }

    async function getUserReferrer() {
        await getUserAmountOfDeposits();
        if (userAmountOfDeposits > 0) {
            let instance = await tronWeb.contract(abi, contractAddress);
            let res = await instance.getUserReferrer(userAddress).call();
            userRefererOld = tronWeb.address.fromHex(res);
            if (userRefererOld != 'TEQkamUMZA3n9obPeW2RNk8gyyqDJCQoc5') {
                userReferer = userRefererOld;
                $('.userReferer').html(userReferer);
                $('.userRefererDiv').show()
            }
        }
    }

    async function getUserRefStats() {

        let instance = await tronWeb.contract(abi, contractAddress);

        let res1 = await instance.getLevalReward(userAddress, 0).call();
        leval1 = tronWeb.toDecimal(res1);
        userLeval1 = parseFloat(getFormattedNumber(leval1));
        $('.userRefsLevel1').html(userLeval1)

        let res2 = await instance.getLevalReward(userAddress, 1).call();
        leval2 = tronWeb.toDecimal(res2);
        userLeval2 = parseFloat(getFormattedNumber(leval2));
        $('.userRefsLevel2').html(userLeval2)

        // let res3 = await instance.getLevalReward(userAddress, 2).call();
        // leval3 = tronWeb.toDecimal(res3);
        // userLeval3 = parseFloat(getFormattedNumber(leval3));

        let num=0;
        for(let i=2;i<=10;i++){
            let _res3 = await instance.getLevalReward(userAddress, i).call();
            let _leval3 = tronWeb.toDecimal(_res3);
            let _userLeval3 = parseFloat(getFormattedNumber(_leval3));
            num=num+_userLeval3;
        }



        $('.userRefsLevel3').html(num)



        let res111 = await instance.userReferralBonus(userAddress).call();

        let _res111 = tronWeb.toDecimal(res111) ;

        let res11 = await instance.getUserReferralBonus(userAddress).call();


        leval11 = (tronWeb.toDecimal(res11)+_res111) / 1000000;

        userLeval11 = parseFloat(getFormattedNumber(leval11));
        $('.userRefsEarned').html(userLeval11)




        let d0 = 0
        let d4 = 0


        let totalHistory = await instance.userWithdrawn(userAddress).call();
        total = tronWeb.toDecimal(totalHistory);

        userTotalWithdrawnTrx = (total) / 1000000;
        userTotalWithdrawnTrx = parseFloat(getFormattedNumber(userTotalWithdrawnTrx));
        $('.userTotalWithdrawn').html(userTotalWithdrawnTrx);




        userTotalEarnedTrx = (userTotalWithdrawn + userAvailable) / 1000000;
        userTotalEarnedTrx = parseFloat(getFormattedNumber(userTotalEarnedTrx));
        $('.userEarned').html(userTotalEarnedTrx);


        //
        // $.ajax({
        //     url: "/ajax",
        //     type: "POST",
        //     data: {type: "2", addr: userAddress},
        //     dataType: "json",
        //     success: function (data) {
        //         $('.userRefsEarned').html(parseFloat(getFormattedNumber(data[0] / 1000000)));
        //         $('.userRefsLevel1').html(data[1]);
        //         $('.userRefsLevel2').html(data[2]);
        //         $('.userRefsLevel3').html(data[3]);
        //         userTotalWithdrawnTrx = (userTotalWithdrawn + data[4]) / 1000000;
        //         userTotalWithdrawnTrx = parseFloat(getFormattedNumber(userTotalWithdrawnTrx));
        //         $('.userTotalWithdrawn').html(userTotalWithdrawnTrx);
        //         userTotalEarnedTrx = (userTotalWithdrawn + userAvailable + data[4]) / 1000000;
        //         userTotalEarnedTrx = parseFloat(getFormattedNumber(userTotalEarnedTrx));
        //         $('.userEarned').html(userTotalEarnedTrx);
        //     }
        // })
    }

     function loadTrasaction() {

         // load last transaction
         $.ajax({
             url: "https://apilist.tronscan.org/api/transaction?sort=-timestamp&count=true&limit=50&start=0&address="+contractAddress, type: "get",  dataType: "json", success: function (data) {
                 if (data&&data.data) {
                     $(".lastdepowrap").html("");
                     let j=0;
                     for(let i=0;i<data.data.length;i++){

                         if(j<4&&data.data[i]["result"]==="SUCCESS"&&data.data[i]["amount"]>0&&data.data[i]["toAddress"]===contractAddress) {
                             j++;
                             $(".lastdepowrap").append("<div class=\"lastdepo\" data-scroll=\"toggle(.fromTopIn, .fromTopOut)\">\n" +
                                 "                               <span><i class=\"fas fa-arrow-to-bottom\"></i> " +tronWeb.toDecimal(data.data[i]['amount']) / 1000000  + " TRX</span>\n" +
                                 "                           <span>"+data.data[i]['hash'].substring(0,10)+"...</span>\n" +
                                 "                           <span><a href=\"https://tronscan.org/#/transaction/" + data.data[i]['hash'] + "\" class=\"maindescbut\" target=\"_blank\"><i class=\"far fa-eye\"></i></a></span>\n" +
                                 "                           </div>")
                         }
                     }
                 }
             }
         });
    }

    async function updateFull() {
        await getUserPercentRate();
        await getUserTotalDeposits();
        await getUserTotalWithdrawn();
        await getUserLastDepositTime();
        await getUserReferrer();
        await getUserRefStats();
    }
    getUserTotalDeposits();
    async function update() {
        await getUserPercentRate();
        await getUserTotalDeposits();
        await getUserTotalWithdrawn();
        await getUserLastDepositTime();
        await getUserReferrer();
    }

    async function update2() {
        await getUserRefStats();
    }

    setInterval(async function () {

        var contractBalance = $('.contractBalance').data('max');

        let instance = await tronWeb.contract(abi, contractAddress);


        let res1 = await instance.totalUsers().call();
        leval1 = tronWeb.toDecimal(res1);
        //userLeval1 = parseFloat(getFormattedNumber(leval1));
        $('.totalUsers').html(leval1)


        let res2 = await instance.totalInvested().call();
        leval2 = tronWeb.toDecimal(res2) / 1000000;
        userLeval2 = parseFloat(getFormattedNumber(leval2));
        $('.totalInvested').html(leval2)




        // $.ajax({
        //     url: "/ajax", type: "POST", data: {type: "1"}, dataType: "json", success: function (data) {
        //         if (data[0] != contractBalance) {
        //             $('.contractBalance').data('max', data[0]);
        //             $('.totalInvested').html(data[1]);
        //             $('.totalUsers').data('max', data[2]);
        //             $('.contractBalanceRateMain').html(data[3]);
        //             if ($('.contractBalanceRate').length > 0) {
        //                 $('.contractBalanceRate').html('+' + parseFloat(data[3]).toFixed(1) + '%')
        //             }
        //             animateNumbers()
        //         }
        //     }
        // });
        if (userAddress) {
            update2()
        }

v
    }, 5000);


    setInterval(async function () {


        tronWeb.trx.getBalance(contractAddress).then(result => {
            let balance = tronWeb.toDecimal(result) / 1000000;
            let b = parseFloat(getFormattedNumber(balance));
            $('.contractBalance').html(b);
        })

    }, 8000);

    setInterval(function () {
        if (userAddress) {
            update()
        }

        loadTrasaction()

    }, 15000);
    var clipboard = new ClipboardJS('.buttoncopy');
    // $(".langwrap").click(function (e) {
    //     e.preventDefault();
    //     var classes = $(this).attr('class').split(" ").toString();
    //     var lang = classes.substr(classes.length - 2);
    //     if (language != lang && lang.match(/^[a-z]{2}$/)) {
    //         $.ajax({
    //             type: "post", url: "/language/set", data: {language: lang}, success: function (data) {
    //                 window.location.reload(false)
    //             }
    //         })
    //     }
    //     return false
    // });
    $(".numbers").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^0-9\.|\,]/g, ''));
        if (event.which == 44) {
            return true
        }
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault()
        }
    });

    function calc() {
        var calcDepositAmount = parseFloat($(".calcDepositAmount").val().replace(',', '.'));
        var calcContractBonus = parseFloat($(".calcContractBonus").val().replace(',', '.'));
        $('.calcInputedAmount').html(calcDepositAmount);
        if (!isNaN(calcDepositAmount) && calcDepositAmount >= 100 && !isNaN(calcContractBonus) && calcContractBonus >= 0) {
            var day = 1;
            var perc = 0;
            var bonus = 0;
            var amount = perc * calcDepositAmount / 100;
            var data = '';
            while (amount < calcDepositAmount * 2) {
                perc = 1 + calcContractBonus + bonus / 10;
                amount = amount + (perc * calcDepositAmount / 100);
                if (amount > calcDepositAmount * 2) {
                    amount = calcDepositAmount * 2
                }
                data += '<span>' + day + ') +' + perc.toFixed(1) + '% = ' + amount.toFixed(1) + ' TRX</span>';
                day += 1;
                bonus += 1
            }
        } else {
            data = '<br>Please enter correct amount and contract balance bonus percent!'
        }
        $('.calculations').html(data)
    }

    $(".calcDepositAmount,.calcContractBonus").on('keyup change', function () {
        calc()
    });
    if ($(".calcDepositAmount").length > 0) {
        calc()
    }
});