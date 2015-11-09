/**
 * Created by Vurt on 01.10.2015.
 */

(function($) {
    $(document).ready(function () {
        var arg = {};
        if($.cookie('action')){
            arg['action']=$.cookie('action');
        }else {
            arg['action']='versions';
            $.cookie('action','versions');
        }
        arg['user']='Vurt';
        arg['session']='qweqeqrqwe';
        init_page(arg);
        if(window.learn){
            setInterval(function(){
                arg['finish']=learn.finish();
            },20000);
        }
        //=======================================================================================
        $(document).ajaxComplete(function(){
            var lineHeight = $('div#return-back').height();
            $('div#return-back p').css('line-height',lineHeight+'px');
            $('div#settings').css('line-height',lineHeight+'px');
            $('div#return-back p').css('font-size',lineHeight*1.5/3+'px');
            $('div#return-back').css('border-radius',lineHeight*0.09+'px');
            $('div#settings').css('border-radius',lineHeight*0.09+'px');
            $('div#content').css('border-radius',$('div#content').width()*0.02+'px');
            $('div#settings').css('font-size',lineHeight*1.5/3+'px');
            $('div#settings').css('width',$('div#settings').height()+'px');
            $('div.categorie-item').css('border-radius',$('div.categorie-item').width()*0.02075+'px');
            $('ul#categories.blist>li').css('border-radius',$('div.categorie-item').width()*0.02075+'px');
            $('div.version-item').css('border-radius', $('div.version-item').width() * 0.02075 + 'px');
            $('ul#versions.blist>li').css('border-radius', $('div.version-item').width() * 0.02075 + 'px');
                $('ul.version-local>li').css('min-width', $('ul.version-local>li').height() + 'px');
            $('li.pg').css('border-radius',$('li.pg').width()*0.02075+'px');
            $('.pg-name, .pg-sl').css('font-size',$('div.blik').height()/2+'px');
            $('div.blik').css('width',$('.pg-cat').width()-2+'px');
            $('div.blik').css('height',$('.pg-cat').height()-2+'px');

            $('ul.pglist-item li').each(function(){
                $(this).find('div.pg-indicator').css('width',parseInt($(this).find('div.pg-percent').html())-0.1+'%');
            });
            $('ul#bottom-menu').css('top',$('body#page').height()-$('ul#bottom-menu').height()+'px');
            $('ul#bottom-menu').css('width',$('ul#bottom-menu').width()+'px');
            $('ul#bottom-menu').css('height',$('ul#bottom-menu').height()+'px');
            var x = document.createElement("AUDIO");
            if (x.canPlayType("audio/mpeg")) {
                x.setAttribute("src",$('[data-play]').attr('data-play'));
                x.setAttribute("preload",'auto');
            } else {
                console.log('Your browser can\'t play mp3!');
            }
            var temp = arg['action'].split('_');
            if(window.learn){
                if(temp[4]=='start'){
                    learn.learn();
                    arg['action']=temp[0]+'_'+temp[1]+'_'+temp[2]+'_'+temp[3]+'_'+learn.lastword[0]+'_'+temp[5];
                    init_page(arg);
                } else learn.learn();
                $('p#cat-counter i.fa-circle').addClass('pg-'+learn.prevword[1]);
                $('#pg-learn > li:nth-child('+learn.prevword[1]+') > div').addClass('pg-active');
                $('span.idindex').prepend(learn.idindex());
                $('[data-letter]').attr('data-letter',temp[0]+'_'+temp[1]+'_'+temp[2]+'_'+temp[3]+'_'+learn.lastword[0]+'_'+temp[5]);
                $('[data-finish]').click(function(){
                    arg['finish']=learn.finish();
                });
                $('[data-delete]').click(function(){
                    window.learn=null;
                });
            }else if(temp[4]!="0"&&temp[5]=="science"){
                arg['action']=temp[0]+'_'+temp[1]+'_'+temp[2];
                init_page(arg);
            }


            $('ul#main.blist>li').css('border-radius',$('div.mi').width()*0.02075+'px');
            $('div.mi').css('border-radius',$('div.mi').width()*0.02075+'px');

            $('#foot-menu li').css('border-bottom-left-radius',$('#foot-menu li').height()*0.2+'px');
            $('#foot-menu li').css('border-bottom-right-radius',$('#foot-menu li').height()*0.2+'px');
            $('#foot-menu li').css('line-height',$('#foot-menu li').height()+'px');

            $('div.sq-letter').css('height',$('div.sq-letter').width()+'px');
            var path=arg['action'].split('_');
            $('[data-link]').click(function(){
                if(path.length==3) {
                    arg['npage']=0;
                }
                var dst=$(this).attr('data-link'),expd = dst.split('_');
                if(this.children[0]&&!this.children[0].classList.contains('free')&&this.children[0].classList.contains('v-loc')){
                    var result = confirm((expd[0]=='UA'?'Ви бажаєте придбати ':'Вы желаете купить ')+this.parentNode.parentNode.children[0].innerHTML+'?');
                    if(result){
                        $.cookie('action',$(this).attr('data-link'));
                        arg['action']=$(this).attr('data-link');
                        arg['buy']=$(this).attr('data-link');
                    }
                } else {
                    $.cookie('action',$(this).attr('data-link'));
                    arg['action']=$(this).attr('data-link');
                }
                init_page(arg);

            });
            $('[data-label]').click(function(){
                var label= $(this).attr('data-label');
                $('ul#foot-menu li').each(function(){
                    $(this).attr('data-link',label+'_'+this.id);
                });
                $('ul#foot-menu').removeClass('hidden');
            });
            var yPosS, yPosE, swipedown=1;
            $('#sq-letter').on('touchstart', function(e) { yPosS = e.originalEvent.touches[0].pageY;} );
            $('#sq-letter').on('touchend', function(e) { yPosE = e.originalEvent.changedTouches[0].pageY;
                if(yPosE-yPosS>$('div#sq-letter').height()/2.2){
                    $('div#rotate-card').click();
                }
            } );

            $('ul#main-letter').on("swipeleft",function(){
                var dst=$('li#bm-next').attr('data-letter');
                $('#main-letter').addClass("hideleft");
                setTimeout(function(){
                    $.cookie('action',dst);
                    arg['action']=dst;
                    init_page(arg);
                },600);
            });
            $('#sq-letter').on("swipeleft",function(){
                var dst=$('li#bm-prev').attr('data-letter');
                $('#sq-letter').addClass("hideleft");
                if(window.learn){
                    learn.toprev();
                    learn.print_r();
                }
                setTimeout(function(){
                    $.cookie('action',dst);
                    arg['action']=dst;
                    init_page(arg);
                },600);
            });
            $('ul#main-letter').on("swiperight",function(){
                var dst=$('li#bm-prev').attr('data-letter');
                $('#main-letter').addClass("hideright");
                setTimeout(function(){
                    $.cookie('action',dst);
                    arg['action']=dst;
                    init_page(arg);
                },600);
            });
            $('#sq-letter').on("swiperight",function(){
                var dst=$('li#bm-next').attr('data-letter');
                $('#sq-letter').addClass("hideright");
                if(window.learn){
                    learn.tonext();
                    learn.print_r();
                }
                setTimeout(function(){
                    $.cookie('action',dst);
                    arg['action']=dst;
                    init_page(arg);
                },600);
            });
            $('#main-letter').addClass('show');
            $('#sq-letter').addClass('show');
            $('div#rotate-card').click(function(){
                var i=0;

                if(swipedown){
                    setTimeout(function(){
                        swipedown=1;
                    },1800);
                $('div#sq-letter').removeClass('mirror');
                (function(){
                    $('div#sq-letter').css('transform','rotateY('+i+'deg)');
                    i++;
                    if(i<=90){
                        setTimeout(arguments.callee,8);
                    }
                })();
                setTimeout(function(){
                    if($('ul.letter-content.lc1').hasClass('hidden')){
                        $('ul.letter-content.lc1').removeClass('hidden');
                        $('div#sq-letter').addClass('mirror');
                        $('ul.letter-content.lc2').addClass('hidden');
                    } else {
                        $('ul.letter-content.lc2').removeClass('hidden');
                        $('div#sq-letter').addClass('mirror');
                        $('ul.letter-content.lc1').addClass('hidden');
                    }
                    (function(){
                            $('div#sq-letter').css('transform','rotateY('+i+'deg)');
                            i++;
                            if(i<=180){
                                setTimeout(arguments.callee,8);
                            }
                            else{
                                $('ul.letter-content').css('transform','');

                            }
                    })();
                },900);
                    swipedown=0;
                }

            });
            $('[data-letter]').click(function(){
                var dst=$(this).attr('data-letter');
                if(this.id=='bm-next'){
                    $('ul#main-letter').addClass("hideright");
                    $('#sq-letter').addClass("hideright");
                    if(window.learn){
                        learn.tonext();
                        learn.print_r();
                    }
                    setTimeout(function(){
                        $.cookie('action',dst);
                        arg['action']=dst;
                        init_page(arg);
                    },600);
                } else {
                    $('p#cat-counter i.fa-circle').addClass('ok');
                    $('ul#main-letter').addClass("hideleft");
                    $('#sq-letter').addClass("hideleft");
                    if(window.learn){
                        learn.toprev();
                        learn.print_r();
                    }
                    setTimeout(function(){
                        $.cookie('action',dst);
                        arg['action']=dst;
                        init_page(arg);
                    },600);
                }
            });
            $('i.fa.fa-play-circle-o[data-play]').click(function(){
                x.play();
            });
        });
    });
    function init_page(arg){
        var temp = arg['action'].split('_');
        $.post("http://auto.pokuponchik.com/engstud.php", arg, function (data){
            if(temp[4]=='0'&&temp[5]=='science'&&!window.learn){
                vjson = $.parseJSON(data);
                window.learn = Object.create(ThatMethod).constructor(vjson.bid,vjson.uid);
                window.flag=0;
                arg['action']=temp[0]+'_'+temp[1]+'_'+temp[2]+'_'+temp[3]+'_'+'start'+'_'+temp[5];
                init_page(arg);
                $('body#page').html(vjson.html);
            } else {
                vjson = $.parseJSON(data);
                $('body#page').html(vjson.html);
            }
        });
    }
})(jQuery);