ajs.controller('BaseController', ['$scope', '$location', '$timeout', '$q', '$localStorage', '$window', 'httpMethods', '$route', function ($scope, $location, $timeout, $q, $localStorage, $window, $route) {
    $.fn.datepicker.dates['tr'] = {
        days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        daysShort: ["Pz", "Pzt", "Sal", "Çrş", "Prş", "Cu", "Cts"],
        daysMin: ["Pz", "Pzt", "Sa", "Çr", "Pr", "Cu", "Ct"],
        months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        monthsShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
        today: "Bugün",
        clear: "Temizle",
        format: "dd/mm/yyyy",
    };

    $scope.convertInputToCustom = function () {
        $(".m_selectpicker").selectpicker({
            noneSelectedText: 'Seçim yapınız'
        });
        $('.personalization-datetimepicker').datetimepicker({
            todayBtn: true,
            language: 'tr',
            minuteStep: 1,
            clearBtn: true,
            todayBtn: "linked",
            todayHighlight: true,
            autoclose: true,
            format: 'dd/mm/yyyy hh:ii',
        });

    };

    $scope.changeLocalDateFormat = function (string_date) {
        if (_.isEmpty(string_date)) {
            return null;
        } else {
            var selected_date = string_date;
            selected_date = selected_date.split("/");
            var day = selected_date[0];
            var month = selected_date[1];
            selected_date = selected_date[2].split(" ");
            var year = selected_date[0];
            selected_date = selected_date[1].split(":");
            var hours = selected_date[0];
            var minutes = selected_date[1];
            var result = new Date(year, month - 1, day, hours, minutes);
            return moment(result).format();
        }
    };

}]);
