'use strict';

$(document).ready(function () {

    let loader = $('.loader');
    let buttonOrder = $('#make-order');
    let inputMacaroon = $('#inputMacaroon');
    let inputName = $('#inputName');
    let inputPhone = $('#inputPhone');

    $('#choose-macaroon').click(function () {
        $('.choose')[0].scrollIntoView({behavior: 'smooth'});
    });

    let addToCardButtons = $('.button-add');

    addToCardButtons.each(function () {
        $(this).click(function (e) {
            inputMacaroon.val($(e.target).closest('.macaroon-actions').siblings('.macaroon-title').text());
            $('.order')[0].scrollIntoView({behavior: 'smooth'});
        });
    });

    Inputmask("+375 (99) 999-99-99").mask(inputPhone);

    $('#burger').click(function () {
        $('#menu').addClass('open');
    });

    $('#menu *').each(function () {
        $(this).on('click', function () {
            $('#menu').removeClass('open');
        });
    });


    buttonOrder.click(function () {
        let hasError = false;

        loader.css('display', 'flex');
        $('.error-input').hide();

        if (!inputMacaroon.val()) {
            inputMacaroon.next().show();
            inputMacaroon.css('border-color', 'red');
            hasError = true;
        } else {
            inputMacaroon.css('border-color', 'rgb(130, 19, 40)');
        }

        if (!inputName.val()) {
            inputName.next().show();
            inputName.css('border-color', 'red');
            hasError = true;
        } else {
            inputName.css('border-color', 'rgb(130, 19, 40)');
        }

        if (!inputPhone.val()) {
            inputPhone.next().show();
            inputPhone.css('border-color', 'red');
            hasError = true;
        } else {
            inputPhone.css('border-color', 'rgb(130, 19, 40)');
        }

        if (hasError) {
            loader.hide();
            return;
        }

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: 'https://testologia.ru/checkout',
                data: {product: inputMacaroon.val(), name: inputName.val(), phone: inputPhone.val()}
            })
                .done(function (message) {
                    loader.hide();
                    if (message.success) {
                        $('.order-info').eq(0).css('display', 'none');
                        $('.order-success').eq(0).css('display', 'flex');
                        $('.order .container').eq(0).css('alignItems', 'center', 'justifyContent', 'spaceBetween').css('justifyContent', 'space-between');
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                        inputMacaroon.val('');
                        inputName.val('');
                        inputPhone.val('');
                    }
                });
        }
    });


})