app
    .controller('t_navigation_controller', function($scope, $rootScope, $state) {
        if (window.XMLHttpRequest) { //XHR创建对象
            // IE7+, Firefox, Chrome, Opera, Safari 代码
            $rootScope.xmlhttp = new XMLHttpRequest();
        } else {
            // IE6, IE5 代码
            $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        $rootScope.sendData = function(url, fd, cfunc) {

            $rootScope.xmlhttp.onreadystatechange = cfunc;
            $rootScope.xmlhttp.open("post", url, true);
            $rootScope.xmlhttp.send(fd);
        };
        $rootScope.getNoticeTitleAndContent = function(notice_time) {
            var fd = new FormData();
            fd.append("notice_time", notice_time);
            $rootScope.sendData("/index.php/index/Index/getAllTitles", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.noticeInstance = JSON.parse($rootScope.xmlhttp.responseText);
                    });
                }
            });
        };
        $rootScope.getXindeTitleAndContent = function(xinde_time) {
            var fd = new FormData();
            fd.append("start_num", xinde_time);
            $rootScope.sendData("/index.php/index/Index/getLearningExTitles", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.xindeInstance = JSON.parse($rootScope.xmlhttp.responseText).result;
                    });
                }
            });
        };
        $rootScope.downloadReportList = function() {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Class/getAllReports", true);
            $scope.sendData("/index.php/index/Class/getAllReports", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.reportAlready = JSON.parse($rootScope.xmlhttp.responseText);
                    });
                }
            });
        };

        $scope.judge_href = function(condition) {
            alert(condition);
            if (condition == 1) {
                $state.go('t_check_info');
                $rootScope.getNoticeTitleAndContent("1");
            } else if (condition == 2) {
                $state.go('t_publish_info');
            } else if (condition == 3) {
                $state.go('t_check_xinde');
                $rootScope.getXindeTitleAndContent("1");
            } else if (condition == 4) {
                $state.go('t_publish_xinde');
            } else if (condition == 6) {
                $state.go('t_publish_homework');
            } else if (condition == 7) {
                $state.go('t_correct_homework');
            } else if (condition == 9) {
                $state.go('t_upload_material');
                $rootScope.downloadReportList();
            }
        };
    })

.controller('t_check_info_controller', ['$scope', '$log', '$rootScope', function($scope, $log, $rootScope) {
    $scope.notice_time = 0;
    $scope.$log = $log;
    $scope.hideContent = [null, true, true, true, true, true];
    $scope.hideRevise = [null, true, true, true, true, true];
    $rootScope.noticeInstance = [];


    //$rootScope.noticeInstanceWithContent;
    if (window.XMLHttpRequest) { //XHR创建对象
        // IE7+, Firefox, Chrome, Opera, Safari 代码
        $rootScope.xmlhttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 代码
        $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    $rootScope.sendData = function(url, fd, cfunc) {

        $rootScope.xmlhttp.onreadystatechange = cfunc;
        $rootScope.xmlhttp.open("post", url, true);
        $rootScope.xmlhttp.send(fd);
    };


    $rootScope.getNoticeTitleAndContent = function(notice_time) {
        var fd = new FormData();
        fd.append("notice_time", notice_time);
        $rootScope.sendData("/index.php/index/Index/getAllTitles", fd, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                $scope.$apply(function() {
                    $scope.noticeInstance = JSON.parse($rootScope.xmlhttp.responseText);
                });
            }
        });
    };

    $rootScope.showNoticeContent = function(notice_id) {
        //$rootScope.getNoticeContent(notice_id);
        $scope.hideContent[notice_id] = !$scope.hideContent[notice_id];
        if ($scope.hideRevise[notice_id] === false)
            $scope.hideRevise[notice_id] = true;
    };
    $rootScope.showReviseView = function(notice_id) {
        // $rootScope.getNoticeContent(notice_id);
        $scope.hideRevise[notice_id] = !$scope.hideRevise[notice_id];
        if ($scope.hideContent[notice_id] === false)
            $scope.hideContent[notice_id] = true;
    };
    //这个URL地址后端还没告诉前端！！！！！
    $rootScope.submitReviseNotice = function(notice_id, notice_title, notice_content) {
        var fd = new FormData();
        $rootScope.xmlhttp.open("post", "/index.php/index/Index/modifyNotice", true);
        fd.append("notice_id", notice_id);
        fd.append("notice_title", notice_title);
        fd.append("notice_content", notice_content);
        $scope.sendData("/index.php/index/Index/modifyNotice", fd, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                alert($rootScope.xmlhttp.responseText);
                $rootScope.getNoticeTitleAndContent(notice_time);
            }
        });
    };
    //这个URL地址后端还没告诉前端！！！！！
    $rootScope.submitDeleteNotice = function(notice_id) {
        var fd = new FormData();
        $rootScope.xmlhttp.open("post", "/index.php/index/Index/deleteNotice", true);
        fd.append("notice_id", notice_id);
        $scope.sendData("/index.php/index/Index/deleteNotice", fd, function() {
            if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                alert($rootScope.xmlhttp.responseText);
                $rootScope.getNoticeTitleAndContent(notice_time);
            }
        });
    };
    $rootScope.showPage = function(pageNum) {
        alert(pageNum);
        $rootScope.notice_time = pageNum;
        var temp = (pageNum - 1) * 5 + 1;
        $rootScope.getNoticeTitleAndContent(temp.toString());
    };
    $rootScope.showPageNext = function() {
        $rootScope.notice_time = $rootScope.notice_time + 1;
        var temp = ($rootScope.notice_time - 1) * 5 + 1;
        $rootScope.getNoticeTitleAndContent(temp.toString());
    };
    $rootScope.showPageBefore = function() {
        if ($rootScope.notice_time > 1)
            $rootScope.notice_time = $rootScope.notice_time - 1;
        var temp = ($rootScope.notice_time - 1) * 5 + 1;
        $rootScope.getNoticeTitleAndContent(temp.toString());
    };

}])

.controller('t_publish_info_controller', ['$scope', '$log', '$rootScope', function($scope, $log, $rootScope) {
        if (window.XMLHttpRequest) { //XHR创建对象
            // IE7+, Firefox, Chrome, Opera, Safari 代码
            $rootScope.xmlhttp = new XMLHttpRequest();
        } else {
            // IE6, IE5 代码
            $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        $rootScope.sendData = function(url, fd, cfunc) {
            $rootScope.xmlhttp.onreadystatechange = cfunc;
            $rootScope.xmlhttp.open("post", url, true);
            $rootScope.xmlhttp.send(fd);
        };
        $rootScope.submitPublishNotice = function(publish_info_title, publish_info_content) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Notice/addNotice", true);
            fd.append("title", publish_info_title);
            fd.append("content", publish_info_content);
            alert(publish_info_title);
            $rootScope.sendData("/index.php/index/Notice/addNotice", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($rootScope.xmlhttp.responseText);
                    $scope.apply(function() {
                        $rootScope.publish_info_title = "";
                        $rootScope.publish_info_content = "";
                    });
                }
            });
        };
    }])
    .controller('t_check_xinde_controller', ['$scope', '$log', '$rootScope', function($scope, $log, $rootScope) {
        $scope.xinde_time = 1;
        $scope.xindeHideContent = [null, true, true, true, true, true];
        $scope.xindeHideRevise = [null, true, true, true, true, true];
        // $rootScope.xindeInstance=[
        //   {id:'1',title:'心得一',name:"邢卫1",time:'2016-12-1',content:'第一次心得内容啦啦啦'},
        //   {id:'2',title:'心得er',name:"邢卫1",time:'2016-12-1',content:'第一次心得内容啦啦啦'},
        //   {id:'3',title:'心得san',name:"邢卫1",time:'2016-12-1',content:'第一次心得内容啦啦啦'}
        // ];

        //$rootScope.noticeInstanceWithContent;
        if (window.XMLHttpRequest) { //XHR创建对象
            // IE7+, Firefox, Chrome, Opera, Safari 代码
            $rootScope.xmlhttp = new XMLHttpRequest();
        } else {
            // IE6, IE5 代码
            $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        $rootScope.sendData = function(url, fd, cfunc) {

            $rootScope.xmlhttp.onreadystatechange = cfunc;
            $rootScope.xmlhttp.open("post", url, true);
            $rootScope.xmlhttp.send(fd);
        };

        $rootScope.getXindeTitleAndContent = function(xinde_time) {
            var fd = new FormData();
            fd.append("start_num", xinde_time);
            $rootScope.sendData("/index.php/index/Index/getLearningExTitles", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.xindeInstance = JSON.parse($rootScope.xmlhttp.responseText).result;
                    });
                }
            });
        };


        $rootScope.showXindeContent = function(xinde_id) {
            $scope.xindeHideContent[xinde_id] = !$scope.xindeHideContent[xinde_id];
            if ($scope.xindeHideRevise[xinde_id] === false)
                $scope.xindeHideRevise[xinde_id] = true;
        };
        $rootScope.showXindeReviseView = function(xinde_id) {
            $scope.xindeHideRevise[xinde_id] = !$scope.xindeHideRevise[xinde_id];
            if ($scope.xindeHideContent[xinde_id] === false)
                $scope.xindeHideContent[xinde_id] = true;
        };
        //这个URL地址后端还没告诉前端！！！！！
        $rootScope.submitReviseXinde = function(xinde_id, xinde_title, xinde_content) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/editLearningEx", true);
            fd.append("id", xinde_id);
            fd.append("title", xinde_title);
            fd.append("content", xinde_content);
            $scope.sendData("/index.php/index/Index/editLearningEx", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($rootScope.xmlhttp.responseText);
                    $rootScope.getXindeTitleAndContent($scope.xinde_time);
                }
            });
        };
        //这个URL地址后端还没告诉前端！！！！！
        $rootScope.submitDeleteXinde = function(xinde_id) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/deleteLearningEx", true);
            fd.append("id", xinde_id);
            $scope.sendData("/index.php/index/Index/deleteLearningEx", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($rootScope.xmlhttp.responseText);
                    $rootScope.getXindeTitleAndContent($scope.xinde_time);
                }
            });
        };
        $scope.showPage = function(pageNum) {
            alert(pageNum);
            $rootScope.notice_time = pageNum;
            var temp = pageNum;
            $rootScope.getXindeTitleAndContent(temp.toString());
        };
        $scope.showPageNext = function() {
            $scope.xinde_time = $scope.xinde_time + 1;
            var temp = $scope.xinde_time;
            $rootScope.getXindeTitleAndContent(temp.toString());
        };
        $scope.showPageBefore = function() {
            if ($scope.xinde_time > 1)
                $scope.xinde_time = $scope.xinde_time - 1;
            var temp = $scope.xinde_time;
            $rootScope.getXindeTitleAndContent(temp.toString());
        };
    }])
    .controller('t_publish_xinde_controller', ['$scope', '$log', '$rootScope', function($scope, $log, $rootScope) {
        if (window.XMLHttpRequest) { //XHR创建对象
            // IE7+, Firefox, Chrome, Opera, Safari 代码
            $rootScope.xmlhttp = new XMLHttpRequest();
        } else {
            // IE6, IE5 代码
            $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        $rootScope.sendData = function(url, fd, cfunc) {
            $rootScope.xmlhttp.onreadystatechange = cfunc;
            $rootScope.xmlhttp.open("post", url, true);
            $rootScope.xmlhttp.send(fd);
        };
        $rootScope.submitPublishNotice = function(publish_xinde_title, publish_xinde_content) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/publishLearningEx", true);
            fd.append("title", publish_xinde_title);
            fd.append("content", publish_xinde_content);
            $rootScope.sendData("/index.php/index/Index/publishLearningEx", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($rootScope.xmlhttp.responseText);
                    $rootScope.publish_xinde_title = "";
                    $rootScope.publish_xinde_content = "";
                }
            });
        };
    }])
    .controller('t_upload_material_controller', ['$scope', '$log', '$rootScope', function($scope, $log, $rootScope) {
        $rootScope.reportAlready = [
            // {time:'1',fileName:'第一次实验报告.doc',uploadDate:'2016/7/11'},
            // {time:'2',fileName:'第二次实验报告.doc',uploadDate:'2016/7/12'},
            // {time:'3',fileName:'第三次实验报告.doc',uploadDate:'2016/7/13'},
            // {time:'4',fileName:'第四次实验报告.doc',uploadDate:'2016/7/14'},

        ];
        $rootScope.slideAlready = [
            // {time:'1',fileName:'第一次课件.ppt',uploadDate:'2016/7/11'},
            // {time:'2',fileName:'第二次课件.ppt',uploadDate:'2016/7/12'},
            // {time:'3',fileName:'第三次课件.ppt',uploadDate:'2016/7/13'},
            // {time:'4',fileName:'第四次课件.ppt',uploadDate:'2016/7/14'},

        ];
        $rootScope.videoAlready = [
            // {time:'1',fileName:'第一次课视频.doc',uploadDate:'2016/7/11'},
            // {time:'2',fileName:'第二次课视频.doc',uploadDate:'2016/7/12'},
            // {time:'3',fileName:'第三次课视频.doc',uploadDate:'2016/7/13'},
            // {time:'4',fileName:'第四次课视频.doc',uploadDate:'2016/7/14'},

        ];
        $rootScope.referrenceAlready = [
            // {time:'1',fileName:'参考资料1.doc',uploadDate:'2016/7/11'},
            // {time:'2',fileName:'参考资料2.doc',uploadDate:'2016/7/12'},
            // {time:'3',fileName:'参考资料3.doc',uploadDate:'2016/7/13'},
            // {time:'4',fileName:'参考资料4.doc',uploadDate:'2016/7/14'},

        ];
        $rootScope.goodWorkAlready = [
            // {time:'1',fileName:'优秀作业1.pdf',uploadDate:'2016/7/11'},
            // {time:'2',fileName:'优秀作业2.pdf',uploadDate:'2016/7/12'},
            // {time:'3',fileName:'优秀作业3.pdf',uploadDate:'2016/7/13'},
            // {time:'4',fileName:'优秀作业4.pdf',uploadDate:'2016/7/14'},

        ];

        if (window.XMLHttpRequest) { //XHR创建对象
            // IE7+, Firefox, Chrome, Opera, Safari 代码
            $rootScope.xmlhttp = new XMLHttpRequest();
        } else {
            // IE6, IE5 代码
            $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        $rootScope.sendData = function(url, fd, cfunc) {
            $rootScope.xmlhttp.onreadystatechange = cfunc;
            $rootScope.xmlhttp.open("post", url, true);
            $rootScope.xmlhttp.send(fd);
        };
        //实验报告模板部分
        $rootScope.downloadReportList = function() {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/getTemplate", true);
            $scope.sendData("/index.php/index/Index/getTemplate", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.reportAlready = JSON.parse($rootScope.xmlhttp.responseText);
                    });
                }
            });
        };
        $rootScope.uploadReport = function(reportDDL) {
            var fd = new FormData();
            var mfile = document.getElementById("reportInstance").files[0];
            if (!mfile) {
                alert("请选择文件");
            }
            var reportTime = $("#chooseReportTime option:selected");
            alert(reportTime.val());
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/upTemplate", true);
            fd.append("chapter", reportTime.val());
            fd.append("report", mfile);
            fd.append("DDL", reportDDL);
            $scope.sendData("/index.php/index/Index/upTemplate", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadReportList();
                }
            });
        };
        $rootScope.deleteReport = function(time) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/deleteTemplate", true);
            fd.append("time", time);
            $scope.sendData("/index.php/index/Index/deleteTemplate", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadReportList();
                }
            });
        };
        //课件部分
        $rootScope.downloadSlideList = function() {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/getSlides", true);
            $scope.sendData("/index.php/index/Index/getSlides", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.slideAlready = JSON.parse($rootScope.xmlhttp.responseText);
                    });
                }
            });
        };
        $rootScope.uploadSlide = function() {
            var fd = new FormData();
            var mfile = document.getElementById("slideInstance").files[0];
            if (!mfile) {
                alert("请选择文件");
            }
            var slideTime = $("#chooseSlideTime option:selected");
            alert(slideTime.val());
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/uploadSlides", true);
            fd.append("time", slideTime.val());
            fd.append("slide", mfile);
            $scope.sendData("/index.php/index/Index/uploadSlides", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadSlideList();
                }
            });
        };
        $rootScope.deleteSlide = function(time) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/deleteSlides", true);
            fd.append("time", time);
            $scope.sendData("/index.php/index/Index/deleteSlides", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadSlideList();
                }
            });
        };
        //视频部分
        $rootScope.downloadVideoList = function() {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/getVideo", true);
            $scope.sendData("/index.php/index/Index/getVideo", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.videoAlready = JSON.parse($rootScope.xmlhttp.responseText);
                    });
                }
            });
        };
        $rootScope.uploadVideo = function() {
            var fd = new FormData();
            var mfile = document.getElementById("videoInstance").files[0];
            if (!mfile) {
                alert("请选择文件");
            }
            var videoTime = $("#chooseVideoTime option:selected");
            alert(videoTime.val());
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/uploadVideo", true);
            fd.append("time", videoTime.val());
            fd.append("video", mfile);
            $scope.sendData("/index.php/index/Index/uploadVideo", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadVideoList();
                }
            });
        };
        $rootScope.deleteVideo = function(time) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/deleteVideo", true);
            fd.append("time", time);
            alert(time);
            $scope.sendData("/index.php/index/Index/deleteVideo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadVideoList();
                }
            });
        };
        //参考资料部分
        $rootScope.downloadReferrenceList = function() {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/getSupplyment", true);
            $scope.sendData("/index.php/index/Index/getSupplyment", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.referrenceAlready = JSON.parse($rootScope.xmlhttp.responseText);
                    });
                }
            });
        };
        $rootScope.uploadReferrence = function() {
            var fd = new FormData();
            var mfile = document.getElementById("referrenceInstance").files[0];
            if (!mfile) {
                alert("请选择文件");
            }
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/uploadSupplyment", true);
            fd.append("referrence", mfile);
            $scope.sendData("/index.php/index/Index/uploadSupplyment", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadReferrenceList();
                }
            });
        };
        $rootScope.deleteReferrence = function(time) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/deleteSupplyment", true);
            fd.append("time", time);
            alert(time);
            $scope.sendData("/index.php/index/Index/deleteSupplyment", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                }
            });
        };
        //优秀作业部分
        $rootScope.downloadGoodWorkList = function() {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/getGoodjob", true);
            $scope.sendData("/index.php/index/Index/getGoodjob", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    $scope.$apply(function() {
                        $rootScope.goodWorkAlready = JSON.parse($rootScope.xmlhttp.responseText);
                    });
                }
            });
        };
        $rootScope.uploadGoodWork = function() {
            var fd = new FormData();
            var mfile = document.getElementById("goodWorkInstance").files[0];
            if (!mfile) {
                alert("请选择文件");
            }
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/uploadGoodjob", true);
            fd.append("goodWork", mfile);
            $scope.sendData("/index.php/index/Index/uploadGoodjob", fd, function() {
                if ($scope.xmlhttp.readyState == 4 && $scope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadGoodWorkList();
                }
            });
        };
        $rootScope.deleteGoodWork = function(time) {
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Index/deleteGoodjob", true);
            fd.append("time", time);
            alert(time);
            $scope.sendData("/index.php/index/Index/deleteGoodjob", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $rootScope.downloadGoodWorkList();
                }
            });
        };
    }])
    .controller('t_publish_homework_controller', function($scope, $rootScope) {
        $scope.a = {
            date: ""
        };
        $scope.chooseHomeworkPanel = false;
        $scope.writeHomeworkPanel = true;
        $scope.fillInQuestionPanel = true;
        $scope.ChooseQuestionPanel = true;
        $scope.homeworkTime = 1;
        $scope.questionID = 0;
        $scope.homeworkQuestion = [];
        $scope.homeworkDDL = "";
        if (window.XMLHttpRequest) { //XHR创建对象
            // IE7+, Firefox, Chrome, Opera, Safari 代码
            $rootScope.xmlhttp = new XMLHttpRequest();
        } else {
            // IE6, IE5 代码
            $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        $rootScope.sendData = function(url, fd, cfunc) {
            $rootScope.xmlhttp.onreadystatechange = cfunc;
            $rootScope.xmlhttp.open("post", url, true);
            $rootScope.xmlhttp.send(fd);
        };
        $scope.showQuestion = function() {
            var type = $("#chooseQuestionType option:selected");
            if (type.val() == "1") {
                $scope.fillInQuestionPanel = true;
                $scope.ChooseQuestionPanel = false;
            } else {
                $scope.fillInQuestionPanel = false;
                $scope.ChooseQuestionPanel = true;
            }
        };
        $scope.nextStep = function() {
            var type = $("#chooseHomeworkTime option:selected");
            $scope.homeworkTime = type.val();
            $scope.chooseHomeworkPanel = true;
            $scope.writeHomeworkPanel = false;
            $scope.fillInQuestionPanel = true;
            $scope.ChooseQuestionPanel = true;
            $scope.homeworkDDL = $scope.a.datepicker;
        };
        $scope.nextChooseQuestion = function(chooseScore, chooseQuestion, chooseAnswerA, chooseAnswerB, chooseAnswerC, chooseAnswerD) {
            var t;
            var temp;
            if ($scope.questionID < $scope.homeworkQuestion.length) { //如果这题已经被编辑过了，显示已填写的值
                $scope.questionID = $scope.questionID + 1;

                if ($scope.homeworkQuestion[$scope.questionID].questionType == 1) { //说明是选择题
                    alert("选择题" + $scope.questionID);
                    $scope.fillInQuestionPanel = true;
                    $scope.ChooseQuestionPanel = false;
                    $scope.chooseScore = $scope.homeworkQuestion[$scope.questionID].chooseScore;
                    $scope.chooseQuestion = $scope.homeworkQuestion[$scope.questionID].chooseQuestion;
                    $scope.chooseAnswerA = $scope.homeworkQuestion[$scope.questionID].chooseAnswerA;
                    $scope.chooseAnswerB = $scope.homeworkQuestion[$scope.questionID].chooseAnswerB;
                    $scope.chooseAnswerC = $scope.homeworkQuestion[$scope.questionID].chooseAnswerC;
                    $scope.chooseAnswerD = $scope.homeworkQuestion[$scope.questionID].chooseAnswerD;
                    t = document.getElementById("chooseQuestionType");
                    t.options[0].selected = true;
                    t = document.getElementById("chooseHomeworkCorrectAnswer");
                    temp = $scope.homeworkQuestion[$scope.questionID].rightQuestionAnswer - 1;
                    t.options[temp].selected = true;
                } else { //说明是填空题
                    alert("填空题" + $scope.questionID + "," + $scope.homeworkQuestion[$scope.questionID].fillInScore);
                    console.log($scope.homeworkQuestion);
                    $scope.fillInQuestionPanel = false;
                    $scope.ChooseQuestionPanel = true;
                    $scope.fillInScore = $scope.homeworkQuestion[$scope.questionID].fillInScore;
                    $scope.fillInQuestion = $scope.homeworkQuestion[$scope.questionID].fillInQuestion;
                    $scope.fillInAnswer = $scope.homeworkQuestion[$scope.questionID].fillInAnswer;
                    t = document.getElementById("chooseQuestionType");
                    t.options[1].selected = true;
                }
            } else {
                var tempQuestionID = $scope.questionID;
                temp = $("#chooseHomeworkCorrectAnswer option:selected");
                var rightQuestionAnswer = temp.val();
                $scope.homeworkQuestion[tempQuestionID] = {
                    questionType: 1,
                    chooseScore: chooseScore,
                    chooseQuestion: chooseQuestion,
                    chooseAnswerA: chooseAnswerA,
                    chooseAnswerB: chooseAnswerB,
                    chooseAnswerC: chooseAnswerC,
                    chooseAnswerD: chooseAnswerD,
                    rightQuestionAnswer: rightQuestionAnswer
                };
                $scope.chooseScore = "";
                $scope.chooseQuestion = "";
                $scope.chooseAnswerA = "";
                $scope.chooseAnswerB = "";
                $scope.chooseAnswerC = "";
                $scope.chooseAnswerD = "";
                t = document.getElementById("chooseQuestionType");
                t.options[0].selected = true;
                t = document.getElementById("chooseHomeworkCorrectAnswer");
                t.options[0].selected = true;
                $scope.questionID = $scope.questionID + 1;
                $scope.fillInQuestionPanel = true;
                $scope.ChooseQuestionPanel = false;
                t = document.getElementById("chooseQuestionType");
                t.options[0].selected = true;
            }
        };
        $scope.beforeChooseQuestion = function(chooseScore, chooseQuestion, chooseAnswerA, chooseAnswerB, chooseAnswerC, chooseAnswerD) {
            var temp = $("#chooseHomeworkCorrectAnswer option:selected");
            var rightQuestionAnswer = temp.val();
            var t;
            $scope.homeworkQuestion[$scope.questionID] = {
                questionType: 1,
                chooseScore: chooseScore,
                chooseQuestion: chooseQuestion,
                chooseAnswerA: chooseAnswerA,
                chooseAnswerB: chooseAnswerB,
                chooseAnswerC: chooseAnswerC,
                chooseAnswerD: chooseAnswerD,
                rightQuestionAnswer: rightQuestionAnswer
            };
            if ($scope.questionID > 0)
                $scope.questionID = $scope.questionID - 1;
            if ($scope.homeworkQuestion[$scope.questionID].questionType == 1) { //说明是选择题
                $scope.fillInQuestionPanel = true;
                $scope.ChooseQuestionPanel = false;
                $scope.chooseScore = $scope.homeworkQuestion[$scope.questionID].chooseScore;
                $scope.chooseQuestion = $scope.homeworkQuestion[$scope.questionID].chooseQuestion;
                $scope.chooseAnswerA = $scope.homeworkQuestion[$scope.questionID].chooseAnswerA;
                $scope.chooseAnswerB = $scope.homeworkQuestion[$scope.questionID].chooseAnswerB;
                $scope.chooseAnswerC = $scope.homeworkQuestion[$scope.questionID].chooseAnswerC;
                $scope.chooseAnswerD = $scope.homeworkQuestion[$scope.questionID].chooseAnswerD;
                t = document.getElementById("chooseQuestionType");
                t.options[0].selected = true;
                t = document.getElementById("chooseHomeworkCorrectAnswer");
                temp = $scope.homeworkQuestion[$scope.questionID].rightQuestionAnswer - 1;
                t.options[temp].selected = true;
            } else { //说明是填空题
                $scope.fillInQuestionPanel = false;
                $scope.ChooseQuestionPanel = true;
                $scope.fillInScore = $scope.homeworkQuestion[$scope.questionID].fillInScore;
                $scope.fillInQuestion = $scope.homeworkQuestion[$scope.questionID].fillInQuestion;
                $scope.fillInAnswer = $scope.homeworkQuestion[$scope.questionID].fillInAnswer;
                t = document.getElementById("chooseQuestionType");
                t.options[1].selected = true;
            }
            console.log($scope.homeworkQuestion);
        };
        $scope.nextFillInQuestion = function(fillInScore, fillInQuestion, fillInAnswer) {
            var t;
            if ($scope.questionID < $scope.homeworkQuestion.length) { //如果这题已经被编辑过了，显示已填写的值
                $scope.questionID = $scope.questionID + 1;
                if ($scope.homeworkQuestion[$scope.questionID].questionType == 1) { //说明是选择题
                    alert("选择题" + $scope.questionID);
                    $scope.fillInQuestionPanel = true;
                    $scope.ChooseQuestionPanel = false;
                    $scope.chooseScore = $scope.homeworkQuestion[$scope.questionID].chooseScore;
                    $scope.chooseQuestion = $scope.homeworkQuestion[$scope.questionID].chooseQuestion;
                    $scope.chooseAnswerA = $scope.homeworkQuestion[$scope.questionID].chooseAnswerA;
                    $scope.chooseAnswerB = $scope.homeworkQuestion[$scope.questionID].chooseAnswerB;
                    $scope.chooseAnswerC = $scope.homeworkQuestion[$scope.questionID].chooseAnswerC;
                    $scope.chooseAnswerD = $scope.homeworkQuestion[$scope.questionID].chooseAnswerD;
                    t = document.getElementById("chooseQuestionType");
                    t.options[0].selected = true;
                    t = document.getElementById("chooseHomeworkCorrectAnswer");
                    var temp = $scope.homeworkQuestion[$scope.questionID].rightQuestionAnswer - 1;
                    t.options[temp].selected = true;
                } else { //说明是填空题
                    alert("填空题" + $scope.questionID);
                    $scope.fillInQuestionPanel = false;
                    $scope.ChooseQuestionPanel = true;
                    $scope.fillInScore = $scope.homeworkQuestion[$scope.questionID].fillInScore;
                    $scope.fillInQuestion = $scope.homeworkQuestion[$scope.questionID].fillInQuestion;
                    $scope.fillInAnswer = $scope.homeworkQuestion[$scope.questionID].fillInAnswer;
                    t = document.getElementById("chooseQuestionType");
                    t.options[1].selected = true;
                }
            } else {
                var tempQuestionID = $scope.questionID;
                $scope.homeworkQuestion[tempQuestionID] = {
                    questionType: 2,
                    fillInScore: fillInScore,
                    fillInQuestion: fillInQuestion,
                    fillInAnswer: fillInAnswer
                };
                $scope.fillInScore = "";
                $scope.fillInQuestion = "";
                $scope.fillInAnswer = "";
                $scope.fillInQuestionPanel = true;
                $scope.ChooseQuestionPanel = false;
                t = document.getElementById("chooseQuestionType");
                t.options[0].selected = true;
                $scope.questionID = $scope.questionID + 1;
            }
        };
        $scope.beforeFillInQuestion = function(fillInScore, fillInQuestion, fillInAnswer) {
            var t;
            console.log($scope.questionID);
            console.log(fillInScore);
            $scope.homeworkQuestion[$scope.questionID] = {
                questionType: 2,
                fillInScore: fillInScore,
                fillInQuestion: fillInQuestion,
                fillInAnswer: fillInAnswer
            };
            if ($scope.questionID > 0)
                $scope.questionID = $scope.questionID - 1;
            if ($scope.homeworkQuestion[$scope.questionID].questionType == 1) { //说明是选择题
                $scope.fillInQuestionPanel = true;
                $scope.ChooseQuestionPanel = false;
                $scope.chooseScore = $scope.homeworkQuestion[$scope.questionID].chooseScore;
                $scope.chooseQuestion = $scope.homeworkQuestion[$scope.questionID].chooseQuestion;
                $scope.chooseAnswerA = $scope.homeworkQuestion[$scope.questionID].chooseAnswerA;
                $scope.chooseAnswerB = $scope.homeworkQuestion[$scope.questionID].chooseAnswerB;
                $scope.chooseAnswerC = $scope.homeworkQuestion[$scope.questionID].chooseAnswerC;
                $scope.chooseAnswerD = $scope.homeworkQuestion[$scope.questionID].chooseAnswerD;
                t = document.getElementById("chooseQuestionType");
                t.options[0].selected = true;
                t = document.getElementById("chooseHomeworkCorrectAnswer");
                var temp = $scope.homeworkQuestion[$scope.questionID].rightQuestionAnswer - 1;
                t.options[temp].selected = true;
            } else { //说明是填空题
                alert("lalaal");
                $scope.fillInQuestionPanel = false;
                $scope.ChooseQuestionPanel = true;
                $scope.fillInScore = $scope.homeworkQuestion[$scope.questionID].fillInScore;
                $scope.fillInQuestion = $scope.homeworkQuestion[$scope.questionID].fillInQuestion;
                $scope.fillInAnswer = $scope.homeworkQuestion[$scope.questionID].fillInAnswer;
                t = document.getElementById("chooseQuestionType");
                t.options[1].selected = true;
            }
            console.log($scope.homeworkQuestion);
        };
        $scope.uploadFillInQuestion = function(fillInScore, fillInQuestion, fillInAnswer) {
            $scope.homeworkQuestion[$scope.questionID] = {
                questionType: 2,
                fillInScore: fillInScore,
                fillInQuestion: fillInQuestion,
                fillInAnswer: fillInAnswer
            };
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Class/deleteGoodWork", true);
            fd.append("homeworkTime", $scope.homeworkTime);
            fd.append("DDL", $scope.homeworkDDL);
            fd.append("homeworkArray", JSON.stringify($scope.homeworkQuestion));
            $scope.sendData("/index.php/index/Class/deleteGoodWork", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $scope.homeworkQuestion = [];
                    $scope.questionID = 0;
                }
            });
        };
        $scope.uploadChooseQuestion = function(chooseScore, chooseQuestion, chooseAnswerA, chooseAnswerB, chooseAnswerC, chooseAnswerD) {
            var temp = $("#chooseHomeworkCorrectAnswer option:selected");
            var rightQuestionAnswer = temp.val();
            $scope.homeworkQuestion[$scope.questionID] = {
                questionType: 1,
                chooseScore: chooseScore,
                chooseQuestion: chooseQuestion,
                chooseAnswerA: chooseAnswerA,
                chooseAnswerB: chooseAnswerB,
                chooseAnswerC: chooseAnswerC,
                chooseAnswerD: chooseAnswerD,
                rightQuestionAnswer: rightQuestionAnswer
            };
            var fd = new FormData();
            $rootScope.xmlhttp.open("post", "/index.php/index/Class/deleteGoodWork", true);
            fd.append("homeworkTime", $scope.homeworkTime);
            fd.append("DDL", $scope.homeworkDDL);
            fd.append("homeworkArray", JSON.stringify($scope.homeworkQuestion));
            $scope.sendData("/index.php/index/Class/deleteGoodWork", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    alert($scope.xmlhttp.responseText);
                    $scope.homeworkQuestion = [];
                    $scope.questionID = 0;
                }
            });
        };

    })

.controller('t_correct_homework_controller', function($scope, $rootScope) {
    $scope.studentOnlineAnswer = [{
        studentID: 1,
        studentName: '陈毅强',
        questionID: '1',
        studentAnswer: '啦啦啦'
    }, {
        studentID: 2,
        studentName: '谢思宇',
        questionID: '1',
        studentAnswer: '萌萌'
    }];
    $scope.studentReport = [{
        studentID: 1,
        studentName: '陈毅强',
        URL: 'http://'
    }, {
        studentID: 1,
        studentName: '谢思宇',
        URL: 'http://'
    }];
});
