(function($){

  //图表集合,每增加一个图表都需要添加到集合中，以响应屏幕大小变化
  var chartList = [];

  /**
   * [初始化表格]
   * @param {param.selector} [图表容器的选择器]
   * @param {param.option} [实例化图表的参数]
   * @param {param.event} [图表的点击事件，默认为空函数]
   */
  function initChart(param){
    var chart = echarts.init(document.querySelector(param.selector));
    chart.setOption(param.option);
    chartList[chartList.length] = chart;
    chart.on('click',param.event||function(){});
  }

  //初始化图表
  initChart({
    selector: '#chart1',
    option: {
      title : {
          text: '',
          subtext: '',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['对公贷款日均','对私贷款日均']
      },
      series : [
          {
              name: '明细',
              type: 'pie',
              radius : '70%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'对公贷款日均'},
                  {value:310, name:'对私贷款日均'}
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    }
  });

  initChart({
    selector: '#chart-line2',
    option: {
        title: {
            text: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:[]
        },
        toolbox: {
            
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['201501','201502','201503','201504','201505','201506','201507']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'存款',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            }
        ]
    }
  });
  initChart({
    selector: '#chart-bar',
    option: {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'        
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['全行', '城中支行', '西域支行', '花桥支行', '震川支行', '异地支行'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'分布',
                type:'bar',
                barWidth: '60%',
                data:[5.76, 1.15, 1.15, 1.15, 1.15, 1.15]
            }
        ]
    },
    event: function(e){
      //这里写柱状图的事件，可以打开窗口之类
      console.log(e)
    }
  });
  initChart({
    selector: '#chart-gauge',
    option: {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                //restore: {},
                //saveAsImage: {}
            }
        },
        series: [
            {
                name: '指标',
                type: 'gauge',
                detail: {formatter:'{value}%',offsetCenter:[0,'100%']},
                data: [{value: 50, name: '营业费用'}],
                radius: '90%',
                axisLine: {            // 坐标轴线
                  lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8
                  },
                },
                splitLine: {            
                  length: 20,
                  lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                      color: '#ddd'
                  }
                },
                pointer: {
                  width: 6
                },
                title : {
                  offsetCenter:[0,'60%']
                }
            }
        ]
    }
  });


  //图表位置
  $(document).on('click','.toggle-width',function(){
    $(this).toggleClass('fa-caret-left fa-caret-right');
    $('.diagram-panel').toggleClass('active');
    $('.toggle-table').toggleClass('hide');
    $(window).resize();
  });
  $(document).on('click','.toggle-table',function(){
    $(this).toggleClass('fa-caret-left fa-caret-right');
    $('#main-content').toggleClass('active');
    $('.diagram-panel').toggleClass('missable');
    $('.toggle-width').toggleClass('hide');
    $(window).resize();
  });

  //列表显示隐藏
  $(document).on('click','.list-item',function(){
    var _this = $(this);
    //调整table padding
    $(window).resize();

    _this.find('i.fa').toggleClass('fa-minus-square-o fa-plus-square-o');//切换 + -；

    //每个.list-item必须有一个对应的tr元素，通过data-target关联
    if(_this.find('i.fa').hasClass('fa-minus-square-o')){
      _this.removeAttr('style').next('ul')
        .children('li').removeAttr('style')
        .children('.list-item').removeAttr('style')
        .each(function(){
          $($(this).attr('data-target')).removeAttr('style');
        });//显示子菜单

    } else {
      _this.next('ul')
        .find('li').css('display','none')
        .find('.list-item').css('display','none')
        .each(function() {
          $($(this).attr('data-target')).css('display','none');
        })
        .find('i.fa').addClass('fa-plus-square-o').removeClass('fa-minus-square-o');//隐藏子菜单
    }
  });

  //层级框
  var offset = $('[data-target="#level-modal"]').offset();
  $('#level-modal').on('show.bs.modal',function(e){
    $(this).find('.modal-content').css({left: offset.left,top: offset.top + e.relatedTarget.offsetHeight - 1});
  });
  $('#level-modal').on('hide.bs.modal',function(e){
    $('[data-target="#level-modal"]').removeClass('active').removeAttr('style');
  });
  $('[data-target="#level-modal"]').click(function(){
    $(this).addClass('active').css({left: offset.left + 1});
  });
    //选择关键字
  $('#level-modal').on('click', '.modal-body li', function(e) {
    var _this = $(this);
    $('[data-related="#'+ _this.parent().attr('id') +'"]').text(_this.text());
    //本事件中还需要添加异步查询，以显示匹配的下一层级选项
    $('[href="#'+ _this.parent().attr('id') +'"]').parent().next().find('[data-toggle="tab"]').click();
  });
    //确定查询条件
  $('.confirm-level').click(function(){
    if($.trim($('[data-related=".level-title"]').text().split('-').join(''))){
      $('.level-title').text($('[data-related=".level-title"]').text());
    }
  });

  //隐藏查询条件栏
  $(document).on('click','.toggle-slide',function(){
    $(this).toggleClass('fa-angle-double-up fa-angle-double-down');
    $('#query-form').toggle();
    $(window).resize();
  });

  //删除对比
  $(document).on('click','.remove-item',function(){
    $(this).closest('li').remove();
  });

  //屏幕变化事件
  $(window).on('resize', function(){
    //每个图表都需要响应屏幕变化
    $.each(chartList,function(k,v){
      v && v.resize();
    });

    //固定表头
    //对比栏宽度
    setTimeout(function(){
      //$('.compare-group').css('width',$('#main-tab').width());
      $('#data-container').css({'padding-left': $('#title-table').width()});
      calcTableHeight();
    });
  }).resize();

  function calcTableHeight(){
    var height = $('#main-content').height() - 
                  parseInt($('#main-tab').css('height')) -
                  parseInt($('#query-form')[0].clientHeight) -
                  parseInt($('.toggle-slide').css('height')) -
                  parseInt($('.compare-panel').css('height')) - 2;
    if( height > $('#table-container')[0].scrollHeight ){
      $('#table-container').css('height', 'auto');
      return;
    }
    $('#table-container').css('height', height);
  }
  //锁表头
  $('#table-container').on('scroll',function(){
    $('#title-table').css('left',this.scrollLeft);
  });

  $(document).ajaxStop(function() {
    $(window).resize();
  });
    
  //时间控件
  Date.prototype.pattern=function(fmt) {         
      var o = {         
        "m+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
      };         
      var week = {         
        "0" : "/u65e5",         
        "1" : "/u4e00",         
        "2" : "/u4e8c",         
        "3" : "/u4e09",         
        "4" : "/u56db",         
        "5" : "/u4e94",         
        "6" : "/u516d"        
      };         
      if(/(y+)/.test(fmt)){         
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
      }         
      if(/(E+)/.test(fmt)){         
          fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
      }         
      for(var k in o){         
          if(new RegExp("("+ k +")").test(fmt)){         
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
          }         
      }         
      return fmt;         
  };
  $('.time-control').datepicker({
    language: 'zh-CN',
    todayHighlight: true,
    autoclose: true,
    format: 'yyyy/mm/dd',
  }).find('input').val((new Date((new Date()).setDate((new Date()).getDate()-1))).pattern('yyyy/mm/dd'));


}(jQuery))