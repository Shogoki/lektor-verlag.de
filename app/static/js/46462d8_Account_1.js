if (!window.account || typeof (account) !== "function") {
    var account = (function() {
        var s = function() {
        };

        s.checkReg = function() {
            this.email = $('#lektor_datastorebundle_userstype_email').val();
            this.url = Routing.generate('lektor_rest_account_accountismailpresent', {'mail': this.email});
            this.valid = true;
            $.ajax({
                url: this.url
            }).done(function( data ) {
                if(data.isValid) {
                    if(data.isPresent) {
                        $('#generateSuccess').hide();
                        $('#generateError').html('Email wird schon verwendet');
                        $('#generateError').show();
                        this.valid = false;
                    }
                } else {
                    $('#generateSuccess').hide();
                    $('#generateError').html('Nicht Valide Email');
                    $('#generateError').show();
                    this.valid = false;
                }
            }).fail(function() {
            });

            this.username = $('#lektor_datastorebundle_userstype_username').val();
            url = Routing.generate('lektor_rest_account_accountisuserpresent', {'mail': this.username});
            if(this.username.length < 3) {
                $('#generateSuccess').hide();
                $('#generateError').html('Username zu kurz, min 3');
                $('#generateError').show();
                this.valid = false;
            }

            if(this.username.length > 25) {
                $('#generateSuccess').hide();
                $('#generateError').html('Username zu lang, max 25');
                $('#generateError').show();
                this.valid = false;
            }

            if(this.username.length >= 3
                && this.username.length <= 25
                ) {
                this.valid = $.ajax({
                    url: this.url
                }).done(function( data ) {
                    if(data.isValid) {
                        if(data.isPresent) {
                            $('#generateSuccess').hide();
                            $('#generateError').html('Username wird schon verwendet');
                            $('#generateError').show();
                            this.valid = false;
                        }
                    } else {
                        $('#generateSuccess').hide();
                        $('#generateError').html('Username ist nicht Valide');
                        $('#generateError').show();
                        this.valid = false;
                    }
                });
            }

            if(this.valid) {
                $("form").submit();
            }
        };

        return s;
    })(window);
    'account' in window || (window.account = account);
}