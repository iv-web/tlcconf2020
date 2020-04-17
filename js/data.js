(function() {
    'use strict';
//19年id:79028579
    axios
        .get('//now.qq.com/cgi-bin/now/activity_cms/form_data?actid=110978686')
        .then(function (response) {
            var data = response.data && response.data.result;
            var url = location.href;

            if (data) {
                if (/speakers/.test(url)) {
                    renderSpeakerPage(data);
                } else if (/subjects/.test(url)) {
                    renderSubjectPage(data);
                } else if (/schedules/.test(url)) {
                    renderSchedulePage(data);
                } else if (/apply/.test(url)) {
                    renderApplyPage(data);
                } else if (/detail/.test(url)) {
                    renderDetailPage(data);
                } else if (/publisher/.test(url)) {
                    renderPublisherPage(data);
                } else {
                    renderIndexPage(data);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    var renderFeature = function(featureInfo) {

        var tpl = '{% for item in items %} <li class="intro-feature-wrap"><div class="intro-feature"><div class="intro-feature-icon"><img src="{{ item.icon }}" class="image"></div><h3 class="intro-feature-title">{{ item.title }}</h3><p class="intro-feature-desc">{{ item.description }}</p></div></li> {% endfor %}'
        var featureOutput = swig.render(tpl, {
            filename: '/tpl',
            locals: {
                items: featureInfo.items
            }
        });

        document.getElementById('intro-feature-list').innerHTML = featureOutput;
    };

    var renderSubject = function(subjectInfo) {
        var subjectMainInfo;
        var  branchItems = [];

        for (var i = 0; i < subjectInfo.items.length; i ++) {
            if (subjectInfo.items[i].isMain) {
                subjectMainInfo = subjectInfo.items[i];
            } else {
                branchItems.push(subjectInfo.items[i]);
            }
        }

        var subjectTpl = '<div class="subject-title"></div> <div class="subject-main"> <p class="subject-main-title">{{ subjectMainInfo.title }}</p> <div class="subject-main-seperate"></div> <p class="subject-main-content">{{ subjectMainInfo.description }}</p> </div> <ul> {% for item in branchItems %}<li class="subject-branch"> <p class="subject-branch-title">{{ item.title }}</p> <div class="subject-branch-seperate"></div> <p class="subject-branch-content">{{ item.description }}</p> </li>{% endfor %}</ul>'
        var subjectOutput = swig.render(subjectTpl, {
            filename: '/subjectTpl',
            locals: {
                subjectMainInfo: subjectMainInfo,
                branchItems: branchItems
            }
        });

        document.getElementById('subject-wrap').innerHTML = subjectOutput;
    };

    var renderPublisher = function(publisherInfo) {

        var publisherTpl = '{% for item in publisherItems %}  <li class="intro-user-item"> <a href="/publisher/?number={{item.number}}" target="_blank"><img src="{{ item.avatar }}"></a> <div class="intro-user-info"> <p class="name"><a href="/publisher/?number={{item.number}}" target="_blank">{{ item.name }}</a></p> <p class="desc">{{ item.brief }}</p> </div> </li>  {% endfor %}'
        var publisherOutput = swig.render(publisherTpl, {
            filename: '/publisherTpl',
            locals: {
                publisherItems: publisherInfo.items
            }
        });

        document.getElementById('publisher-items').innerHTML = publisherOutput;
    };

    var renderSpeaker = function(subjectInfo) {
        var speakderItems = [];

        for (var i = 0; i < subjectInfo.items.length; i ++) {
            for (var j = 0; j < subjectInfo.items[i].speakers.length; j ++) {
                if (subjectInfo.items[i].speakers[j].isShowIndex) {
                    speakderItems.push(subjectInfo.items[i].speakers[j])
                }
            }
        }
        var speakerTpl = '{% for item in speakerItems %}  <li class="intro-user-item"> <a href="/detail/?number={{ item.number }}" target="_blank"><img src="{{ item.avatar }}"></a> <div class="intro-user-info"> <p class="name"><a href="/detail/?number={{ item.number }}" target="_blank">{{ item.name }}</a></p> <p class="desc">{{ item.brief }}</p> </div> </li>  {% endfor %}'
        var speakerOutput = swig.render(speakerTpl, {
            filename: '/speakerTpl',
            locals: {
                speakerItems: speakderItems
            }
        });

        document.getElementById('speaker-items').innerHTML = speakerOutput;
    };

    var renderPartner = function(sponsorInfo) {
        var sponsorTpl = '{% for item in sponsorItems %}  <li class="partner-item"><a href="{{ item.link }}" target="_blank"><img src="{{ item.logo }}"></a></li>  {% endfor %}'
        var sponsorOutput = swig.render(sponsorTpl, {
            filename: '/sponsorTpl',
            locals: {
                sponsorItems: sponsorInfo.items
            }
        });

        document.getElementById('sponsor-items').innerHTML = sponsorOutput;
    };

    var renderFriendLink = function(friendlinkInfo) {
        var friendLinkOutputTpl = '{% for item in friendlinkItems %}  <li><a href="{{ item.link }}" target="_blank">{{ item.text }}</a></li>  {% endfor %}'
        var friendLinkOutput = swig.render(friendLinkOutputTpl, {
            filename: '/friendLinkOutputTpl',
            locals: {
                friendlinkItems: friendlinkInfo.rules
            }
        });

        document.getElementById('friendlink-items').innerHTML = friendLinkOutput;
    };

    var renderIndexPage = function(data) {
        if (window.innerWidth > 768) {
            $('#banner').css('background-image', 'url('+data.bannerInfo.imageUrl+')');
        }

        renderFeature(data.featureInfo);
        renderSubject(data.subjectInfo);
        renderPublisher(data.publisherInfo);
        renderSpeaker(data.subjectInfo);
        renderPartner(data.sponsorInfo);
        renderFriendLink(data.friendlinkInfo);
    };

    var renderSpeakerPage = function(data) {

        var initialTabContent = function() {
            renderTabContent(getAllSpeakers());
            renderFriendLink(data.friendlinkInfo);
        };

        var getAllSpeakers = function() {
            var speakerItems = [];
            for (var i = 0; i < items.length; i ++) {
                speakerItems = speakerItems.concat(items[i].speakers);
            }
            return speakerItems;
        };

        var renderTabContent = function(speakerItems) {
            var tabContentTpl = '{% for item in speakerItems %}  <li class="intro-user-item"><a href="/detail/?number={{ item.number }}" target="_blank"><img src="{{item.avatar}}"> </a><div class="intro-user-info"> <a href="/detail/?number={{ item.number }}" target="_blank"><p class="name">{{item.name}}</a></p> <p class="desc">{{item.brief}}</p> </div> </li>  {% endfor %}'
            var tabContentOutput = swig.render(tabContentTpl, {
                locals: {
                    speakerItems: speakerItems
                }
            });

            $('#intro-user-wrap').html(tabContentOutput);
        };

        var items = data.subjectInfo.items;

        var headItems = ['全部'];

        for (var i = 0; i < items.length; i ++) {
            headItems.push(items[i].title);
        }

        var tabHeadTpl = '{% for item in headItems %}  <li>{{ item }}</li>  {% endfor %}'
        var tabHeadOutput = swig.render(tabHeadTpl, {
            filename: '/tabHeadTpl',
            locals: {
                headItems: headItems
            }
        });

        $('#tab-head-items').html(tabHeadOutput);
        initialTabContent();

        $('#tab-head-items li').click(function() {
            var index = $(this).index();

            var speakerItems = [];

            if (index) {
                speakerItems = items[index - 1].speakers;
            } else {
                speakerItems = getAllSpeakers();
            }

            renderTabContent(speakerItems);
        });

    };

    var renderSubjectPage = function(data) {
        var subjectTpl = '{% for item in subjectItems %}<div id="speaker-subject-wrap"> {% if item.isMain %} {% endif %}<div class="{% if item.isMain %} speaker-subject-main {% else %} speaker-subject-branch {% endif %}"> <p class="speaker-subject-main-title">{{item.title}}</p> <div class="speaker-subject-main-seperate"></div> <p class="speaker-subject-main-content">{{item.description}}</p> </div> <ul> {% for speakerItem in item.speakers %}<li class="speaker-subject-items"> <div class="speaker-avatar"><a href="/detail/?number={{ speakerItem.number }}" target="_blank"><img src="{{speakerItem.avatar}}" /></a></div> <div class="speaker-info"><p class="speaker-topic"><a href="/detail/?number={{ speakerItem.number }}" target="_blank">{{speakerItem.topic}}</a></p> <p class="speaker-name">{{speakerItem.name}}</p> </div> </li>{% endfor %}</ul> </div> {% endfor %}';

        var subjectOutput = swig.render(subjectTpl, {
            filename: '/subjectTpl',
            locals: {
                subjectItems: data.subjectInfo.items
            }
        });
        renderFriendLink(data.friendlinkInfo);
        $('#subject-wrap').html(subjectOutput);
    };

    var renderSchedulePage = function(data) {
        renderFriendLink(data.friendlinkInfo);

        var headerData = [];

        var tableData = {};

        var speakerMap = {};
        for (var i = 0; i < data.subjectInfo.items.length; i ++) {
            for (var j = 0; j < data.subjectInfo.items[i].speakers.length; j ++) {

                var speakerItem = data.subjectInfo.items[i].speakers[j];

                speakerMap[speakerItem.number] = speakerItem;
            }
        }


        for ( var i = 0; i < data.subjectInfo.items[0].schedules.length; i ++) {
            tableData[data.subjectInfo.items[0].schedules[i].timeline] = [];
        }

        for ( var i = 0; i < data.subjectInfo.items.length; i ++) {
            headerData.push({title: data.subjectInfo.items[i].title, location: data.subjectInfo.items[i].location});
            for (var j = 0; j < data.subjectInfo.items[i].schedules.length; j ++) {
                var timeline = data.subjectInfo.items[i].schedules[j].timeline;
                var plan = data.subjectInfo.items[i].schedules[j].plan;
                var number = data.subjectInfo.items[i].schedules[j].number;

                if (plan) {
                    tableData[timeline].push(plan);
                } else if (number) {
                    tableData[timeline].push(speakerMap[number]);
                }
            }

            for (var key in tableData) {
                if (tableData[key].length !== i + 1) {
                    tableData[key].push('/')
                }
            }
        }

        var contentTpl = '<tr class="dark-blue"> <td class="bold">时间</td> {% for headerItem in headerData %}<td class="bold blue"><p>{{headerItem.title}}</p><p class="location">({{headerItem.location}})</p></td>{% endfor %}</tr>{% for key, val in tableData %}<tr> <td>{{ key }}</td> {% for item in val %} <td> {% if item.topic %}<p class="blue"><a href="/detail/?number={{item.number}}" target="_blank">{{item.topic}}</a></p> <p>{{item.name}}</p>{% else %}<p class="blue">{{item}}</p> {% endif %}</td>{% endfor %} </tr>{% endfor %}';
        
        var h5ContentTpl = '{% for key, val in tableData %}<div class="schedule-subject-branch "> <span class="schedule-subject-main-title">{{val.title}}</span> <span class="schedule-subject-main-content">({{val.location}})</span> <span class="schedule-subject-time">时间</span> </div>{% for item in val.schedules %} {% if speakerMap[item.number] && speakerMap[item.number].topic %} <div class="topic-item"><div class="content"> <div class="author-wrap"> <div class="author-info"> <p class="name"><a href="/detail/?number={{item.number}}" target="_blank">{{ speakerMap[item.number].topic}}</a></p> <p class="title">{{speakerMap[item.number].name}}</p> </div></div><div class="time">{{speakerMap[item.number].time}}</div> </div></div>{% endif %} {% if item.plan %}<div class="topic-item"><div class="content"> <div class="author-wrap"><div class="avatar"></div> <div class="author-info"> <p class="name">{{item.plan}}</p> </div></div><div class="time">{{item.timeline}}</div> </div></div>{% endif %} {% endfor %}{% endfor %}';

        var contentOutput = swig.render(contentTpl, {
            locals: {
                headerData: headerData,
                tableData: tableData
            }
        });

        console.log(data.subjectInfo.items)
        var h5ContentOutput = swig.render(h5ContentTpl, {
            locals: {
                tableData: data.subjectInfo.items,
                speakerMap: speakerMap
            }
        });

        $('#schedule-wrap').html(contentOutput);
        $('#schedule-wrap-h5').html(h5ContentOutput);

    };

    var renderApplyPage = function(data) {

        var renderReviewImages = function(reviewImageInfo) {
            var contentTpl = '{% for item in imgs %}<img src={{item.imgUrl}} data-url={{item.link}} />{% endfor %}'
            var contentOutput = swig.render(contentTpl, {
                locals: {
                    imgs: reviewImageInfo.imgs
                }
            });

            var requirementsTpl = '{% for item in infos %}<div class="section"> <div class="section-title">{{item.title}}</div> <div class="section-content"> {% for textItem in item.info %}<p>{{textItem.text}}</p>{% endfor %} </div> </div>{% endfor %}'
            var requirementsOutput = swig.render(requirementsTpl, {
                locals: {
                    infos: reviewImageInfo.infos
                }
            });

            $('#carousel').html(contentOutput);
            $('#section-wrapper').html(requirementsOutput);

            $(document).ready(function(){
                $('#carousel').carousel({curDisplay: 0, autoPlay: false, interval: 3000});
            });
        };

        renderReviewImages(data.reviewImageInfo);
        renderFriendLink(data.friendlinkInfo);
    }

    var renderDetailPage = function(data) {

        var getUrlArgObject = function() {
            var args=new Object();
            var query=location.search.substring(1);
            var pairs=query.split(",");
            for(var i=0;i<pairs.length;i++){
                var pos=pairs[i].indexOf('=');
                if(pos==-1){
                    continue;
                }
                var argname=pairs[i].substring(0,pos);
                var value=pairs[i].substring(pos+1);
                args[argname]=unescape(value);
            }
            return args;
        }

        var renderTopicInfo = function(subjectInfo) {
            var urlObject = getUrlArgObject();
            var number = parseInt(urlObject['number']);

            var speakerItem;
            for (var i = 0; i < subjectInfo.items.length; i ++) {
                for (var j = 0; j < subjectInfo.items[i].speakers.length; j ++) {

                    if (subjectInfo.items[i].speakers[j].number === number) {
                        speakerItem = subjectInfo.items[i].speakers[j];
                        speakerItem.branchName = subjectInfo.items[i].title;
                        if (speakerItem.intro) {
                            speakerItem.intro = speakerItem.intro.replace(/\n/g, '<br/>');
                        }
                    }
                }
            }

            var contentTpl = '<div class="base-info"> <div> <div class="title">演讲：<br/>{{speakerItem.topic}}</div> <div class="author">{{speakerItem.name}} | {{speakerItem.brief}}</div> </div> <div class="logo-url"> <img src="{{speakerItem.avatar}}" /> </div> </div> <div class="topic-detail"> <p>{{speakerItem.intro | raw}}</p> </div> <div class="conf-info"> <div class="location"> <i></i> <div> <p class="key">地点</p> <p class="value">{{speakerItem.location}}</p> </div> </div> <div class="time"> <i></i> <div> <p class="key">时间</p> <p class="value">{{speakerItem.time}}</p> </div> </div> <div class="branch"> <i></i> <div> <p class="key">所属会场</p> <p class="value">{{speakerItem.branchName}}</p> </div> </div> </div>'
            var contentOutput = swig.render(contentTpl, {
                locals: {
                    speakerItem: speakerItem
                }
            });

            $('#detail-wrap').html(contentOutput);

        };

        renderTopicInfo(data.subjectInfo);
        renderFriendLink(data.friendlinkInfo);

    }

    var renderPublisherPage = function(data) {

        var getUrlArgObject = function() {
            var args=new Object();
            var query=location.search.substring(1);
            var pairs=query.split(",");
            for(var i=0;i<pairs.length;i++){
                var pos=pairs[i].indexOf('=');
                if(pos==-1){
                    continue;
                }
                var argname=pairs[i].substring(0,pos);
                var value=pairs[i].substring(pos+1);
                args[argname]=unescape(value);
            }
            return args;
        }

        var renderTopicInfo = function(data) {
            var publisherInfo = data.publisherInfo;
            var subjectInfo = data.subjectInfo;
            var urlObject = getUrlArgObject();
            var number = parseInt(urlObject['number']);

            var publisherItem;
            for (var i = 0; i < publisherInfo.items.length; i ++) {
                if (publisherInfo.items[i].number === number) {
                    publisherItem = publisherInfo.items[i];
                }
            }

            var speakerList = [];
            for (var i = 0; i < subjectInfo.items.length; i ++) {
                for (var j = 0; j < subjectInfo.items[i].speakers.length; j ++) {
                    if (publisherItem.speakerIds.split(',').indexOf(subjectInfo.items[i].speakers[j].number.toString()) > -1) {
                        var speakerItem = subjectInfo.items[i].speakers[j];
                        speakerItem.branchName = subjectInfo.items[i].title;
                        speakerList.push(speakerItem);
                    }
                }
            }

            publisherItem.speakerList = speakerList;

            console.log(publisherItem)



            var contentTpl = '<div class="base-info"> <div> <div class="title">出品人：{{publisherItem.name}}</div> <div class="author">{{publisherItem.brief}}</div> </div> <div class="logo-url"> <img src="{{publisherItem.avatar}}" /> </div> </div> <div class="topic-detail"> <p>{{publisherItem.detail}}</p> </div><div class="speaker-list">{% for item in publisherItem.speakerList %}<div class="speaker-item"><div class="speaker-header"><div class="speaker-title"><a href="/detail/?number={{item.number}}" target="_blank">专题：{{item.topic}}</a></div>  <div class="location"><div> <p class="key">地点</p> <p class="value">{{item.location}}</p> </div> <i></i> </div> </div><div class="speaker-detail">{{item.intro}}</div></div>{% endfor %}</div></div>'
            var contentOutput = swig.render(contentTpl, {
                locals: {
                    publisherItem: publisherItem
                }
            });

            $('#publisher-wrap').html(contentOutput);

        };

        renderTopicInfo(data);
        renderFriendLink(data.friendlinkInfo);

    }

  }());
