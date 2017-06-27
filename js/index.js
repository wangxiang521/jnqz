/**
 * Created by Administrator on 2016/11/3 0003.
 */
/*$('.btnList>a').on('click',function(e){
    console.log(1)
    e.preventDefault();
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
})*/
//ģ�������

var app = angular.module('jnqz', ['ng', 'ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/start', {templateUrl: 'tpl/start.html',controller:'startCtrl'})
        .when('/activity', {templateUrl: 'tpl/activity.html'})
        .when('/product1', {templateUrl: 'tpl/product1.html',controller:'prdCtrl'})
        .when('/mine', {templateUrl: 'tpl/mine.html'})
        .when('/detail',{templateUrl: 'tpl/detail.html'})
        .when('/productdetail',{templateUrl: 'tpl/productdetail.html',controller:'prddetailCtrl'})
        .when('/minewater',{templateUrl: 'tpl/minewater.html'})
        .when('/minetz',{templateUrl: 'tpl/minetz.html'})
        .when('/minesafe',{templateUrl: 'tpl/minesafe.html'})
        .when('/dlmm',{templateUrl: 'tpl/dlmm.html'})
        .when('/yxrz',{templateUrl: 'tpl/yxrz.html'})
        .when('/smrz',{templateUrl: 'tpl/smrz.html'})
        .when('/fl',{templateUrl: 'tpl/minefl.html'})
        .when('/fx',{templateUrl: 'tpl/fx.html'})
        .when('/yzsj',{templateUrl: 'tpl/yzsj.html'})
        .when('/wcsz',{templateUrl: 'tpl/wcsz.html'})
        .when('/szmm',{templateUrl: 'tpl/szmm.html'})
        .when('/zc',{templateUrl: 'tpl/zc.html'})
        .when('/safepromit',{templateUrl: 'tpl/safepromit.html'})
        .otherwise({redirectTo: '/start'})
})
app.controller('parentCtrl', function ($scope,$location) {
    $scope.jump = function (path) {
        $location.path(path);
    }
    $('body').on('click','.count',function(){
        $('.count-modal').css('display','block')
    })
    $('body').on('click','.modal-content b',function(){
        $('.modall').css('display','none')
    })
    $('body').on('click','.wd',function(e){
        e.preventDefault()
        $('#login').css('display','block')
    })
    $('body').on('click','#login',function(){
        $('#login').css('display','none')
    })
    $('body').on('click','.back',function(e){
        e.preventDefault();
        window.history.go(-1)
    })
    $('body').on('click','.back1',function(e){
        e.preventDefault();
        window.history.go(-1)
    })
    $('body').on('click','.fx',function(e){
        e.preventDefault()
       $('.fx-modal').css('display','block')
    })
    $('body').on('click','.fx-modal',function(){
        $('.fx-modal').css('display','none')
    })
});
app.controller('prdCtrl',function($scope){
    $('.active_nav>div').on('click',function(){
        $(this).addClass('active_xz');
        $(this).siblings().removeClass('active_xz');
    })
    function drawCircle(_options){
        var options = _options || {};    //��ȡ����options����;
        options.angle = options.angle || 1;    //����Ĭ�ϽǶ�1Ϊ360��(�Ƕȷ�Χ 0-1);
        options.color = options.color || '#ff0000';    //����Ĭ����ɫ����������ͱ߿���ɫ��;
        options.lineWidth = options.lineWidth || 5;    //����Ĭ��Բ��ߵĿ��;
        options.lineCap = options.lineCap || 'square';    //������ߵ���ʽ��Ĭ��Ϊֱ�Ǳߣ�round ΪԲ��

        var oBoxOne = document.getElementById(options.id);
        var sCenter = oBoxOne.width / 2;    //��ȡcanvasԪ�ص����ĵ�;
        var ctx = oBoxOne.getContext('2d');
        var nBegin = Math.PI / 2;    //������ʼ�Ƕ�;
        var nEnd = Math.PI * 2;    //��������Ƕ�;
        var grd = ctx.createLinearGradient(0, 0, oBoxOne.width, 0);    //grd����Ϊ��߽�����ʽ;
        grd.addColorStop(0, 'red');
        grd.addColorStop(0.5, 'yellow');
        grd.addColorStop(1, 'green');

        ctx.textAlign = 'center';    //�����������;
        ctx.textBaseline='middle'
        ctx.font = 'normal normal  1.2rem Arial';    //��������Ӵִ�С������ʽ;
        ctx.fillStyle = options.color == 'grd' ? grd : options.color;    //�ж����������ʽΪ��ɫ�����ǽ���ɫ;
        ctx.fillText((options.angle * 100) + '%', sCenter, sCenter);    //�����������;
        /*ctx.strokeStyle = grd;    //���������ʽΪ����ɫ;
         ctx.strokeText((options.angle * 100) + '%', sCenter, sCenter);    //�����������(���ο�����);*/
        ctx.lineCap = options.lineCap;
        ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
        ctx.lineWidth = options.lineWidth;

        ctx.beginPath();    //������ʼ·������λ���360�ȱ���;
        ctx.strokeStyle = '#d2d2d2';
        ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
        ctx.stroke();

        var imd = ctx.getImageData(0, 0, 240, 240);
        function draw(current) {    //�ú���ʵ�ֽǶȻ���;
            ctx.putImageData(imd, 0, 0);
            ctx.beginPath();
            ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
            ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
            ctx.stroke();
        }

        var t = 0;
        var timer = null;
        function loadCanvas(angle) {    //�ú���ѭ������ָ���Ƕȣ�ʵ�ּ��ض���;
            timer = setInterval(function(){
                if (t > angle) {
                    draw(options.angle);
                    clearInterval(timer);
                }else{
                    draw(t);
                    t += 0.02;
                }
            }, 20);
        }
        loadCanvas(options.angle);    //����ٶȱȽǶ�  0-1 ��Χ;
        timer = null;

    }

    var W=$('#circle').css('width');
    var H=$('#circle').css('height');
    $('canvas').attr('height',H );
    $('canvas').attr('width', W);
    drawCircle({
        id: 'one',
        angle: 0.5,
    });
})
app.controller('startCtrl',function($scope){


})
app.controller('prddetailCtrl',function($scope){


})