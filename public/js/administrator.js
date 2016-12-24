app
    .controller('sidebar', function($scope, $rootScope, $state) {

        //declare admin sidebar list
        $scope.group = [];
        $scope.group = ["管理学生信息", "管理教师信息", "管理课程信息", "管理班级信息"];

        //store information of all classes, include year, semester, course and class

        $rootScope.allClasses = [];
        $rootScope.allCourses = [];

        $rootScope.years = [];
        $rootScope.semesters = [];
        $rootScope.courses = [];
        $rootScope.classnames = [];

        //admin stu info - batch import
        $rootScope.showDataForBatch = {
            years: [],
            semesters: [],
            classnames: [],
            successTip: false,
            errorTip: false,
            errorTipContent: ""
        };

        //admin stu info - add student
        $rootScope.showDataForAddStudent = {
            years: [],
            semesters: [],
            classnames: [],
            successTip: false,
            errorTip: false,
            errorTipContent: ""
        };

        //admin teacher info - add teacher info
        $rootScope.showDataForAddTeacher = {
            years: [],
            semesters: [],
            classnames: [],
            successTip: false,
            errorTip: false,
            errorTipContent: ""
        };

        //admin class info - add class info
        $rootScope.showDataForAddClass = {
            allCourses: [],
            allSemesters: ["秋冬", "春夏"],
            allDays: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            allTimes: ["1,2节", "3,4节", "3,4,5节", "6,7节", "6,7,8节", "9,10节", "11,12节", "11,12,13节"],
            successTip: false,
            errorTip: false,
            errorTipContent: ""
        };

        //admin class info - delete class info
        $rootScope.showDataForDeleteClass = {
            years: [],
            semesters: [],
            classnames: [],
            successTip: false,
            errorTip: false,
            errorTipContent: ""
        };

        /*create XMLHttpRequest object
         *compatible with IE5、IE6、IE7+、Firefox、Chrome、Safari 以及 Opera
         */
        if (window.XMLHttpRequest) {
            // IE7+, Firefox, Chrome, Opera, Safari
            $rootScope.xmlhttp = new XMLHttpRequest();
        } else {
            // IE6, IE5
            $rootScope.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        $rootScope.xmlhttp.responseText = "";
        /**
         * [sendData used to send ajax request]
         * @param  {[string]} url   [target url]
         * @param  {[object]} fd    [formdata object]
         * @param  {[function]} cfunc [callback function]
         */
        $rootScope.sendData = function(url, fd, cfunc) {
            $rootScope.xmlhttp.onreadystatechange = cfunc;
            $rootScope.xmlhttp.open("post", url, true);
            $rootScope.xmlhttp.send(fd);
        };

        $scope.verifyIdentity = function() {
            var fd = new FormData();
            $rootScope.sendData("/index.php/index/Index/isAdmin", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200 || $rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 404) {
                    if ($rootScope.xmlhttp.responseText !== "true") {
                        alert("请先登录");
                        $state.go("visitor");
                    }
                }
            });
        };
        $scope.verifyIdentity();

        /**
         * [toggleGroup used to jump to refered admin page]
         * @param  {[number]} number []
         */
        $scope.toggleGroup = function(number) {
            // $rootScope.mainTitle = $scope.group[number];
            if (number === 0) {
                $scope.getAllClasses($scope.flushAdminStu);
                $state.go('administrator.student');
            } else if (number == 1) {
                $scope.getAllClasses($scope.flushAdminTea);
                $state.go('administrator.teacher');
            } else if (number == 2) {
                $state.go('administrator.course');
            } else if (number == 3) {
                $scope.getAllCourses($scope.flushAdminClass);
                $state.go('administrator.class');
            }
        };

        $rootScope.filterDuplicate = function(arr, type) {
            var array = {};
            var returnArr = [];
            var itemType;
            angular.forEach(arr, function(item) {
                if (!array[item]) {
                    array[item] = true;
                    this.push(item);
                }
            }, returnArr);
            return returnArr;
        };

        $rootScope.filterDuplicate2D = function(arr, type) {
            var array = {};
            var returnArr = [];
            var itemType;
            angular.forEach(arr, function(item) {
                if (!array[item[type]]) {
                    array[item[type]] = true;
                    this.push(item[type]);
                }
            }, returnArr);
            return returnArr;
        };


        $rootScope.filterExist = function(arr, key, value, neededKey) {
            var returnArr = [];
            var itemValue;
            if (neededKey !== "") {
                angular.forEach(arr, function(item) {
                    itemValue = item[key];
                    if (itemValue === value) {
                        this.push(item[neededKey]);
                    }
                }, returnArr);
            } else {
                angular.forEach(arr, function(item) {
                    itemValue = item[key];
                    if (itemValue === value) {
                        this.push(item);
                    }
                }, returnArr);
            }
            return returnArr;
        };
        /**
         * [getAllClasses get all classes execute immediately after logging system ]
         */
        $scope.getAllClasses = function(fun) {
            var fd = new FormData();
            $rootScope.sendData("/index.php/index/Index/getAdminClassInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.allClasses = JSON.parse($rootScope.xmlhttp.responseText).result;

                    $rootScope.years = $rootScope.filterDuplicate2D($rootScope.allClasses, "year");
                    $rootScope.semesters = $rootScope.filterDuplicate2D($rootScope.allClasses, "semester");
                    $rootScope.classnames = $rootScope.filterDuplicate2D($rootScope.allClasses, "classname");
                    $scope.$apply(function() {
                        fun();
                    });
                }
            });
        };

        $scope.getAllCourses = function(fun) {
            var fd = new FormData();
            $rootScope.sendData("/index.php/index/Index/getAdminCourseInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.allCourses = JSON.parse($rootScope.xmlhttp.responseText).result;
                    $rootScope.courses = $rootScope.filterDuplicate2D($rootScope.allCourses, "course");
                    $scope.$apply(function() {
                        $rootScope.showDataForAddClass.allCourses = $rootScope.courses;
                    });
                    $scope.getAllClasses(fun);
                }
            });
        };
        $scope.flushAdminStu = function() {
            $rootScope.showDataForBatch.years = $rootScope.years;
            $rootScope.showDataForBatch.semesters = $rootScope.semesters;
            $rootScope.showDataForBatch.classnames = $rootScope.classnames;

            $rootScope.showDataForAddStudent.years = $rootScope.years;
            $rootScope.showDataForAddStudent.semesters = $rootScope.semesters;
            $rootScope.showDataForAddStudent.classnames = $rootScope.classnames;
        };

        $scope.flushAdminTea = function() {
            $rootScope.showDataForAddTeacher.years = $rootScope.years;
            $rootScope.showDataForAddTeacher.semesters = $rootScope.semesters;
            $rootScope.showDataForAddTeacher.classnames = $rootScope.classnames;
        };

        $scope.flushAdminClass = function() {
            $rootScope.showDataForAddClass.allCourses = $rootScope.courses;
            $rootScope.showDataForDeleteClass.years = $rootScope.years;
            $rootScope.showDataForDeleteClass.semesters = $rootScope.semesters;
            $rootScope.showDataForDeleteClass.classnames = $rootScope.classnames;
        };

        $rootScope.searchClassId = function(arr, year, semester, classname) {
            var returnArr = [];
            angular.forEach(arr, function(item) {
                if (item.year === year && item.semester === semester && item.classname === classname) {
                    this.push(item.class_id);
                }
            }, returnArr);
            return returnArr[0];
        };

        $rootScope.searchCourseId = function(arr, course) {
            var returnArr = [];
            angular.forEach(arr, function(item) {
                if (item.course === course) {
                    this.push(item.course_id);
                }
            }, returnArr);
            return returnArr[0];
        };


    })
    .controller('title', function($scope, $rootScope, $state) {
        $rootScope.mainTitle = "你好，管理员";
    })
    .controller('studentBatchAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.submittedDataForBatch = {
            selectedYear: "",
            selectedSemester: "",
            selectedClass: "",
            selectedExcel: {}
        };

        $rootScope.result = "";
        $scope.upload = function(files) {
            $scope.$apply(function() {
                $scope.submittedDataForBatch.selectedExcel = files[0];
            });
        };
        $scope.updateBatchSelect = function(condition) {
            var temporarySemesters, temporaryAllClasses, temporaryClasses;
            if (condition === "semester") {
                temporarySemesters = $rootScope.filterExist($rootScope.allClasses, "year", $scope.submittedDataForBatch.selectedYear, "semester");
                $rootScope.showDataForBatch.semesters = $rootScope.filterDuplicate(temporarySemesters, "semester");
            } else if (condition === "classname") {
                temporaryAllClasses = $rootScope.filterExist($rootScope.allClasses, "year", $scope.submittedDataForBatch.selectedYear, "");
                temporaryClasses = $rootScope.filterExist(temporaryAllClasses, "semester", $scope.submittedDataForBatch.selectedSemester, "classname");
                $rootScope.showDataForBatch.classes = $rootScope.filterDuplicate(temporaryClasses, "class");
            }
        };
        $scope.imporStuData = function() {
            var fd = new FormData();
            var class_id = $rootScope.searchClassId($rootScope.allClasses, $scope.submittedDataForBatch.selectedYear, $scope.submittedDataForBatch.selectedSemester, $scope.submittedDataForBatch.selectedClass);
            fd.append("class_id", class_id);
            fd.append("excel", $scope.submittedDataForBatch.selectedExcel);

            $rootScope.sendData("/index.php/index/Index/addAdminStudents", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;

                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.showDataForBatch.successTip = true;
                            console.log($rootScope.showDataForBatch.successTip);
                            $timeout(function() {
                                $rootScope.showDataForBatch.successTip = false;
                            }, 1000);
                        } else if ($rootScope.result === "false_insertStudent") {
                            $rootScope.showDataForBatch.errorTipContent = "插入学生信息失败,请重新尝试";
                            $rootScope.showDataForBatch.errorTip = true;
                            $timeout(function() {
                                $rootScope.showDataForBatch.errorTip = false;
                            }, 1000);
                        } else if ($rootScope.result === "false_insertTake") {
                            $rootScope.showDataForBatch.errorTipContent = "插入上课信息失败,请重新尝试";
                            $rootScope.showDataForBatch.errorTip = true;
                            $timeout(function() {
                                $rootScope.showDataForBatch.errorTip = false;
                            }, 1000);
                        }
                    });
                }
            });

        };


    })
    .controller('studentSingleAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.submittedDataForAddStudent = {
            name: "",
            id: "",
            selectedYear: "",
            selectedSemester: "",
            selectedClass: ""
        };

        $scope.stuSelectedAllClassIds = [];
        $scope.stuSelectedAllClasses = [];
        $scope.showDataForDeleteStudent = {
            successTip: false,
            errorTip: false
        };
        $scope.submittedDataForDeleteStudent = {
            id: "",
        };
        $scope.deleteStuInfo = function() {
            var fd = new FormData();
            fd.append("stu_id", $scope.submittedDataForDeleteStudent.id);

            $rootScope.sendData("/index.php/index/Index/deleteAdminStudent", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $scope.showDataForDeleteStudent.successTip = true;
                            $timeout(function() {
                                $scope.showDataForDeleteStudent.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $scope.showDataForDeleteStudent.errorTip = true;
                            $timeout(function() {
                                $scope.showDataForDeleteStudent.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
        $scope.updateAddStuSelect = function(condition) {
            var temporarySemesters, temporaryAllClasses, temporaryClasses;
            if (condition === "semester") {
                temporarySemesters = $rootScope.filterExist($rootScope.allClasses, "year", $scope.submittedDataForAddStudent.selectedYear, "semester");
                $rootScope.showDataForAddStudent.semesters = $rootScope.filterDuplicate(temporarySemesters, "semester");
            } else if (condition === "classname") {
                temporaryAllClasses = $rootScope.filterExist($rootScope.allClasses, "year", $scope.submittedDataForAddStudent.selectedYear, "");
                temporaryClasses = $rootScope.filterExist(temporaryAllClasses, "semester", $scope.submittedDataForAddStudent.selectedSemester, "classname");
                $rootScope.showDataForAddStudent.classnames = $rootScope.filterDuplicate(temporaryClasses, "classname");
            }
        };
        $scope.addClass = function() {
            var class_id;
            var item = {
                selectedYear: "",
                selectedSemester: "",
                selectedClass: ""
            };
            class_id = $rootScope.searchClassId($rootScope.allClasses, $scope.submittedDataForAddStudent.selectedYear, $scope.submittedDataForAddStudent.selectedSemester, $scope.submittedDataForAddStudent.selectedClass);
            $scope.stuSelectedAllClassIds.push(class_id);
            item.selectedYear = $scope.submittedDataForAddStudent.selectedYear;
            item.selectedSemester = $scope.submittedDataForAddStudent.selectedSemester;
            item.selectedClass = $scope.submittedDataForAddStudent.selectedClass;
            $scope.stuSelectedAllClasses.push(item);
            $rootScope.showDataForAddStudent.years = $rootScope.years;
            $rootScope.showDataForAddStudent.semesters = $rootScope.semesters;
            $rootScope.showDataForAddStudent.classnames = $rootScope.classnames;

        };
        $scope.submitStuInfo = function() {
            var fd = new FormData();
            fd.append("stu_name", $scope.submittedDataForAddStudent.name);
            fd.append("stu_id", $scope.submittedDataForAddStudent.id);
            fd.append("class_id", JSON.stringify($scope.stuSelectedAllClassIds));

            $rootScope.sendData("/index.php/index/Index/addAdminStudent", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;

                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.showDataForAddStudent.successTip = true;
                            $timeout(function() {
                                $rootScope.showDataForAddStudent.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.showDataForAddStudent.errorTip = true;
                            $timeout(function() {
                                $rootScope.showDataForAddStudent.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });

        };

    })
    .controller('teacherSingleAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.submittedDataForAddTeacher = {
            name: "",
            id: "",
            selectedYear: "",
            selectedSemester: "",
            selectedClass: ""
        };

        $scope.TeaSelectedAllClasses = [];
        $scope.TeaSelectedAllClassIds = [];
        $scope.submittedDataForDeleteTeacher = {
            id: ""
        };
        $scope.showDataForDeleteTeacher = {
            successTip: false,
            errorTip: false
        };

        $scope.deleteTeaInfo = function() {
            var fd = new FormData();
            fd.append("t_id", $scope.submittedDataForDeleteTeacher.id);

            $rootScope.sendData("/index.php/index/Index/deleteTeaInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $scope.showDataForDeleteTeacher.successTip = true;
                            $timeout(function() {
                                $scope.showDataForDeleteTeacher.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $scope.showDataForDeleteTeacher.errorTip = true;
                            $timeout(function() {
                                $scope.showDataForDeleteTeacher.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
        $scope.updateAddTeaSelect = function(condition) {
            var temporarySemesters, temporaryAllClasses, temporaryClasses;
            if (condition === "semester") {
                temporarySemesters = $rootScope.filterExist($rootScope.allClasses, "year", $scope.submittedDataForAddTeacher.selectedYear, "semester");
                $rootScope.showDataForAddTeacher.semesters = $rootScope.filterDuplicate(temporarySemesters, "semester");
            } else if (condition === "classname") {
                temporaryAllClasses = $rootScope.filterExist($rootScope.allClasses, "year", $scope.submittedDataForAddTeacher.selectedYear, "");
                temporaryClasses = $rootScope.filterExist(temporaryAllClasses, "semester", $scope.submittedDataForAddTeacher.selectedSemester, "classname");
                $rootScope.showDataForAddTeacher.classnames = $rootScope.filterDuplicate(temporaryClasses, "classname");
            }
        };
        $scope.addClass = function() {
            var class_id;

            var item = {
                selectedYear: "",
                selectedSemester: "",
                selectedClass: ""
            };
            item.selectedYear = $scope.submittedDataForAddTeacher.selectedYear;
            item.selectedSemester = $scope.submittedDataForAddTeacher.selectedSemester;
            item.selectedClass = $scope.submittedDataForAddTeacher.selectedClass;
            $scope.TeaSelectedAllClasses.push(item);

            class_id = $rootScope.searchClassId($rootScope.allClasses, $scope.submittedDataForAddTeacher.selectedYear, $scope.submittedDataForAddTeacher.selectedSemester, $scope.submittedDataForAddTeacher.selectedClass);
            $scope.TeaSelectedAllClassIds.push(class_id);
            $rootScope.showDataForAddTeacher.years = $rootScope.years;
            $rootScope.showDataForAddTeacher.semesters = $rootScope.semesters;
            $rootScope.showDataForAddTeacher.classnames = $rootScope.classnames;

        };
        $scope.submitTeaInfo = function() {
            var fd = new FormData();
            fd.append("t_name", $scope.submittedDataForAddTeacher.name);
            fd.append("t_id", $scope.submittedDataForAddTeacher.id);
            fd.append("class_id", JSON.stringify($scope.TeaSelectedAllClasses));

            $rootScope.sendData("/index.php/index/Index/addTeaInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.showDataForAddTeacher.successTip = true;
                            $timeout(function() {
                                $rootScope.showDataForAddTeacher.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.showDataForAddTeacher.errorTip = true;
                            $timeout(function() {
                                $rootScope.showDataForAddTeacher.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });

        };

    })
    .controller('courseSingleAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.submittedDataForAddCourse = {
            subject: "",
            credits: "",
            teach_hours: "",
            textbook: "",
            background: "",
            assess: "",
            prerequ: "",
            outline: "",
            project: "",
            description: ""
        };
        $scope.submittedDataForDeleteCourse = {
            course_id: ""
        };
        $scope.showDataForAddCourse = {
            successTip: false,
            errorTip: false
        };
        $scope.showDataForDeleteCourse = {
            successTip: false,
            errorTip: false
        };

        $scope.addCourseInfo = function() {
            var fd = new FormData();
            fd.append("subject", $scope.submittedDataForAddCourse.subject);
            fd.append("credits", $scope.submittedDataForAddCourse.credits);
            fd.append("teach_hours", $scope.submittedDataForAddCourse.teach_hours);
            fd.append("textbook", $scope.submittedDataForAddCourse.textbook);
            fd.append("background", $scope.submittedDataForAddCourse.background);
            fd.append("assess", $scope.submittedDataForAddCourse.assess);
            fd.append("prerequ", $scope.submittedDataForAddCourse.prerequ);
            fd.append("outline", $scope.submittedDataForAddCourse.outline);
            fd.append("project", $scope.submittedDataForAddCourse.project);
            fd.append("description", $scope.submittedDataForAddCourse.description);

            $rootScope.sendData("/index.php/index/Index/addCourseInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $scope.showDataForAddCourse.successTip = true;
                            $timeout(function() {
                                $scope.showDataForAddCourse.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $scope.showDataForAddCourse.errorTip = true;
                            $timeout(function() {
                                $scope.showDataForAddCourse.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
        $scope.deleteCourseInfo = function() {
            var fd = new FormData();
            fd.append("course_id", $scope.submittedDataForDeleteCourse.course_id);

            $rootScope.sendData("/index.php/index/Index/deleteCourseInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $scope.showDataForDeleteCourse.successTip = true;
                            $timeout(function() {
                                $scope.showDataForDeleteCourse.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $scope.showDataForDeleteCourse.errorTip = true;
                            $timeout(function() {
                                $scope.showDataForDeleteCourse.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
    })
    .controller('classSingleAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.submittedDataForAddClass = {
            selectedYear: "2016-2017",
            selectedSemester: "",
            selectedCourse: "",
            selectedDay: "",
            selectedTime: ""
        };

        $scope.submittedDataForDeleteClass = {
            selectedYear: "",
            selectedSemester: "",
            selectedClass: ""
        };

        $scope.addClassInfo = function() {
            var fd = new FormData();
            var course_id = $rootScope.searchCourseId($rootScope.allCourses, $scope.submittedDataForAddClass.selectedCourse);
            var time = $scope.submittedDataForAddClass.selectedDay + $scope.submittedDataForAddClass.selectedTime;
            fd.append("year", $scope.submittedDataForAddClass.selectedYear);
            fd.append("semester", $scope.submittedDataForAddClass.selectedSemester);
            fd.append("course_id", course_id);
            fd.append("time", time);

            $rootScope.sendData("/index.php/index/Index/addAdminClass", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;
                    if ($rootScope.result === "success") {
                        $rootScope.showDataForAddClass.successTip = true;
                        $timeout(function() {
                            $rootScope.showDataForAddClass.successTip = false;
                        }, 2000);
                    } else if ($rootScope.result === "false") {
                        $rootScope.showDataForAddClass.errorTip = true;
                        $timeout(function() {
                            $rootScope.showDataForAddClass.errorTip = false;
                        }, 2000);
                    }
                }
            });
        };

        $scope.updateDeleteClassSelect = function(condition) {
            var temporarySemesters, temporaryAllClasses, temporaryClasses;
            if (condition === "semester") {
                temporarySemesters = $rootScope.filterExist($rootScope.allClasses, "year", $scope.submittedDataForDeleteClass.selectedYear, "semester");
                $rootScope.showDataForDeleteClass.semesters = $rootScope.filterDuplicate(temporarySemesters, "semester");
            } else if (condition === "classname") {
                temporaryAllClasses = $rootScope.filterExist($rootScope.allClasses, "year", $scope.submittedDataForDeleteClass.selectedYear, "");
                temporaryClasses = $rootScope.filterExist(temporaryAllClasses, "semester", $scope.submittedDataForDeleteClass.selectedSemester, "classname");
                $rootScope.showDataForDeleteClass.classnames = $rootScope.filterDuplicate(temporaryClasses, "classname");
            }
        };

        $scope.deleteClassData = function() {
            var fd = new FormData();
            var class_id = $rootScope.searchClassId($rootScope.allClasses, $scope.submittedDataForDeleteClass.selectedYear, $scope.submittedDataForDeleteClass.selectedSemester, $scope.submittedDataForDeleteClass.selectedClass);
            fd.append("class_id", class_id);

            $rootScope.sendData("/index.php/index/Index/deleteAdminClass", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = JSON.parse($rootScope.xmlhttp.responseText).result;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.showDataForDeleteClass.successTip = true;
                            $timeout(function() {
                                $rootScope.showDataForDeleteClass.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.showDataForDeleteClass.errorTip = true;
                            $timeout(function() {
                                $rootScope.showDataForDeleteClass.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
    });
