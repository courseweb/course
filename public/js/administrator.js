app
    .controller('sidebar', function($scope, $rootScope, $state) {

        //declare admin sidebar list
        $scope.group = [];
        $scope.group = ["管理学生信息", "管理教师信息", "管理课程信息", "管理班级信息"];

        //store information of all classes, include year, semester, course and class
        // [{
        //     year: "2015-2016",
        //     semester: "秋冬学期",
        //     course : "软件需求工程",
        //     teacher : "刘玉生",
        //     time : "周一第3,4,5节-周五第3,4,5节"
        // }]
        $rootScope.allClasses = [];

        $rootScope.years = [];
        $rootScope.semesters = [];
        $rootScope.courses = [];
        $rootScope.classes = [];

        //admin stu info - batch import
        $rootScope.batch = {
            years: [],
            semesters: [],
            classes: [],
            successTip: false,
            errorTip: false
        };

        //admin stu info - add student
        $rootScope.addStu = {
            years: [],
            semesters: [],
            classes: [],
            successTip: false,
            errorTip: false
        };

        //admin teacher info - add teacher info
        $rootScope.addTea = {
            years: [],
            semesters: [],
            classes: [],
            successTip: false,
            errorTip: false
        };

        //admin class info - add class info
        $rootScope.addClass = {
            allCourses: [],
            allSemesters: ["秋冬学期", "春夏学期"],
            successTip: false,
            errorTip: false
        };

        //admin class info - delete class info
        $rootScope.deleteAllClass = {
            years: [],
            semesters: [],
            classes: [],
            successTip: false,
            errorTip: false
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

        /**
         * [toggleGroup used to jump to refered admin page]
         * @param  {[number]} number []
         */
        $scope.toggleGroup = function(number) {
            // $rootScope.mainTitle = $scope.group[number];
            if (number === 0) {
                // $state.go('administrator.student');
                $state.go('administrator.student');

                $scope.flushAdminStu();
            } else if (number == 1) {
                $state.go('administrator.teacher');
                $scope.flushAdminTea();
            } else if (number == 2) {
                $state.go('administrator.course');

            } else if (number == 3) {
                $state.go('administrator.class');
                $scope.flushAdminClass();
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


        $rootScope.filterExist = function(arr, key, value, neededKey) {
            var returnArr = [];
            var itemValue;
            if (neededKey !== "") {
                angular.forEach(arr, function(item) {
                    itemValue = item[key];
                    if (itemValue === value) {
                        this.push(item[neededKey]);
                        console.log(item[neededKey]);
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
        $scope.getAllClasses = function() {
            var fd = new FormData();
            $rootScope.sendData("/index.php/index/Admin/getAllClasses", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.allClasses = JSON.parse($rootScope.xmlhttp.responseText);

                    $rootScope.years = $rootScope.filterDuplicate($rootScope.allClasses, "year");
                    $rootScope.semesters = $rootScope.filterDuplicate($rootScope.allClasses, "semester");
                    $rootScope.classes = $rootScope.filterDuplicate($rootScope.allClasses, "class");
                    $rootScope.courses = $rootScope.filterDuplicate($rootScope.allClasses, "course");
                }
            });
        };

        $scope.flushAdminStu = function() {
            $rootScope.batch.years = $rootScope.years;
            $rootScope.batch.semesters = $rootScope.semesters;
            $rootScope.batch.classes = $rootScope.classes;

            $rootScope.addStu.years = $rootScope.years;
            $rootScope.addStu.semesters = $rootScope.semesters;
            $rootScope.addStu.classes = $rootScope.classes;
        };

        $scope.flushAdminTea = function() {
            $rootScope.addTea.years = $rootScope.years;
            $rootScope.addTea.semesters = $rootScope.semesters;
            $rootScope.addTea.classes = $rootScope.classes;
        };

        $scope.flushAdminClass = function() {
            $rootScope.addClass.allCourses = $rootScope.courses;
            $rootScope.deleteAllClass.years = $rootScope.years;
            $rootScope.deleteAllClass.semesters = $rootScope.semesters;
            $rootScope.deleteAllClass.classes = $rootScope.classes;
        };




    })
    .controller('title', function($scope, $rootScope, $state) {
        $rootScope.mainTitle = "你好，管理员";
    })
    .controller('studentBatchAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.importedData = {
            selectedYear: "",
            selectedSemester: "",
            selectedClass: "",
            selectedExcel: {}
        };

        $rootScope.result = "";
        $scope.upload = function(files) {
            $scope.$apply(function() {
                $scope.importedData.selectedExcel = files[0];
            });
        };
        $scope.updateBatchSelect = function(condition) {
            var temporarySemesters, temporaryAllClasses, temporaryClasses;
            if (condition === "semester") {
                temporarySemesters = $rootScope.filterExist($rootScope.allClasses, "year", $scope.importedData.selectedYear, "semester");
                $rootScope.batch.semesters = $rootScope.filterDuplicate(temporarySemesters, "semester");
            } else if (condition === "class") {
                temporaryAllClasses = $rootScope.filterExist($rootScope.allClasses, "year", $scope.importedData.selectedYear, "");
                temporaryClasses = $rootScope.filterExist(temporaryAllClasses, "semester", $scope.importedData.selectedSemester, "class");
                $rootScope.batch.classes = $rootScope.filterDuplicate(temporaryClasses, "class");
            }
        };
        $scope.imporStuData = function() {
            var fd = new FormData();
            fd.append("year", $scope.importedData.selectedYear);
            fd.append("semester", $scope.importedData.selectedSemester);
            fd.append("class", $scope.importedData.selectedClass);
            fd.append("excel", $scope.importedData.selectedExcel);

            $rootScope.sendData("/index.php/index/Admin/imporStuData", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.batch.successTip = true;
                            $timeout(function() {
                                $rootScope.batch.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false format") {
                            $rootScope.batch.errorTip = true;
                            $timeout(function() {
                                $rootScope.batch.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });

        };


    })
    .controller('studentSingleAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.addStuData = {
            name: "",
            id: "",
            selectedYear: "",
            selectedSemester: "",
            selectedClass: ""
        };

        $scope.stuSelectedAllClasses = [];
        $scope.deleteStu = {
            id: "",
            successTip: false,
            errorTip: false
        };
        $scope.deleteStuInfo = function() {
            var fd = new FormData();
            fd.append("stu_id", $scope.deleteStu.id);

            $rootScope.sendData("/index.php/index/Admin/deleteStuInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.deleteStu.successTip = true;
                            $timeout(function() {
                                $rootScope.deleteStu.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.deleteStu.errorTip = true;
                            $timeout(function() {
                                $rootScope.deleteStu.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
        $scope.updateAddStuSelect = function(condition) {
            var temporarySemesters, temporaryAllClasses, temporaryClasses;
            if (condition === "semester") {
                temporarySemesters = $rootScope.filterExist($rootScope.allClasses, "year", $scope.addStuData.selectedYear, "semester");
                $rootScope.addStu.semesters = $rootScope.filterDuplicate(temporarySemesters, "semester");
            } else if (condition === "class") {
                temporaryAllClasses = $rootScope.filterExist($rootScope.allClasses, "year", $scope.addStuData.selectedYear, "");
                temporaryClasses = $rootScope.filterExist(temporaryAllClasses, "semester", $scope.addStuData.selectedSemester, "class");
                $rootScope.addStu.classes = $rootScope.filterDuplicate(temporaryClasses, "class");
            }
        };
        $scope.addClass = function() {
            var classItem = {
                selectedYear: "",
                selectedSemester: "",
                selectedClass: ""
            };
            classItem.selectedYear = $scope.addStuData.selectedYear;
            classItem.selectedSemester = $scope.addStuData.selectedSemester;
            classItem.stuSelectedAllClasses = $scope.addStuData.selectedClass;
            $scope.stuSelectedAllClasses.push(classItem);
            $rootScope.addStu.years = $rootScope.years;
            $rootScope.addStu.semesters = $rootScope.semesters;
            $rootScope.addStu.classes = $rootScope.classes;

        };
        $scope.submitStuInfo = function() {
            var fd = new FormData();
            fd.append("stu_name", $scope.addStuData.name);
            fd.append("stu_id", $scope.addStuData.id);
            fd.append("stu_allClasses", JSON.stringify($scope.stuSelectedAllClasses));

            $rootScope.sendData("/index.php/index/Admin/submitStuInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;

                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.addStu.successTip = true;
                            $timeout(function() {
                                $rootScope.addStu.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.addStu.errorTip = true;
                            $timeout(function() {
                                $rootScope.addStu.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });

        };

    })
    .controller('teacherSingleAdmin', function($scope, $rootScope, $state, $timeout) {
        $rootScope.addTeaData = {
            name: "",
            id: "",
            selectedYear: "",
            selectedSemester: "",
            selectedClass: ""
        };

        $scope.TeaSelectedAllClasses = [];
        $scope.deleteTea = {
            id: ""
        };
        $scope.deleteTea.successTip = false;
        $scope.deleteTea.errorTip = false;
        $scope.deleteTeaInfo = function() {
            var fd = new FormData();
            fd.append("tea_id", $scope.deleteTea.id);

            $rootScope.sendData("/index.php/index/Admin/deleteTeaInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.deleteTea.successTip = true;
                            $timeout(function() {
                                $rootScope.deleteTea.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.deleteTea.errorTip = true;
                            $timeout(function() {
                                $rootScope.deleteTea.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
        $scope.updateAddTeaSelect = function(condition) {
            var temporarySemesters, temporaryAllClasses, temporaryClasses;
            if (condition === "semester") {
                temporarySemesters = $rootScope.filterExist($rootScope.allClasses, "year", $rootScope.addTeaData.selectedYear, "semester");
                $rootScope.addTea.semesters = $rootScope.filterDuplicate(temporarySemesters, "semester");
            } else if (condition === "class") {
                temporaryAllClasses = $rootScope.filterExist($rootScope.allClasses, "year", $rootScope.addTeaData.selectedYear, "");
                temporaryClasses = $rootScope.filterExist(temporaryAllClasses, "semester", $rootScope.addTeaData.selectedSemester, "class");
                $rootScope.addTea.classes = $rootScope.filterDuplicate(temporaryClasses, "class");
            }
        };
        $scope.addClass = function() {
            var classItem = {
                selectedYear: "",
                selectedSemester: "",
                selectedClass: ""
            };
            classItem.selectedYear = $rootScope.addTeaData.selectedYear;
            classItem.selectedSemester = $rootScope.addTeaData.selectedSemester;
            classItem.TeaSelectedAllClasses = $rootScope.addTeaData.selectedClass;
            $scope.TeaSelectedAllClasses.push(classItem);
            $rootScope.addTea.years = $rootScope.years;
            $rootScope.addTea.semesters = $rootScope.semesters;
            $rootScope.addTea.classes = $rootScope.classes;

        };
        $scope.submitTeaInfo = function() {
            var fd = new FormData();
            fd.append("tea_name", $rootScope.addTeaData.name);
            fd.append("tea_id", $rootScope.addTeaData.id);
            fd.append("tea_allClasses", JSON.stringify($scope.TeaSelectedAllClasses));

            $rootScope.sendData("/index.php/index/Admin/submitTeaInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.addTea.successTip = true;
                            $timeout(function() {
                                $rootScope.addTea.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.addTea.errorTip = true;
                            $timeout(function() {
                                $rootScope.addTea.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });

        };

    })
    .controller('courseSingleAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.addedCourse = {
            subject: "",
            credits: "",
            teach_hours: "",
            textbook: "",
            background: "",
            assess: "",
            prerequ: "",
            outline: "",
            project: ""
        };
        $scope.addCourse = {};
        $scope.deleteCourse = {
            course_id: ""
        };

        $scope.addCourse.successTip = false;
        $scope.addCourse.errorTip = false;
        $scope.deleteCourse.successTip = false;
        $scope.deleteCourse.errorTip = false;

        $scope.addCourseInfo = function() {
            var fd = new FormData();
            fd.append("subject", $scope.addedCourse.subject);
            fd.append("credits", $scope.addedCourse.credits);
            fd.append("teach_hours", $scope.addedCourse.teach_hours);
            fd.append("textbook", $scope.addedCourse.textbook);
            fd.append("background", $scope.addedCourse.background);
            fd.append("assess", $scope.addedCourse.assess);
            fd.append("prerequ", $scope.addedCourse.prerequ);
            fd.append("outline", $scope.addedCourse.outline);
            fd.append("project", $scope.addedCourse.project);

            $rootScope.sendData("/index.php/index/Admin/addCourseInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.addCourse.successTip = true;
                            $timeout(function() {
                                $rootScope.addCourse.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.addCourse.errorTip = true;
                            $timeout(function() {
                                $rootScope.addCourse.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
        $scope.deleteCourseInfo = function() {
            var fd = new FormData();
            fd.append("course_id", $scope.deleteCourse.course_id);

            $rootScope.sendData("/index.php/index/Admin/deleteCourseInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.deleteCourse.successTip = true;
                            $timeout(function() {
                                $rootScope.deleteCourse.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.deleteCourse.errorTip = true;
                            $timeout(function() {
                                $rootScope.deleteCourse.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
    })
    .controller('classSingleAdmin', function($scope, $rootScope, $state, $timeout) {
        $scope.addedClass = {
            selectedYear: 2016,
            selectedSemester: "",
            selectedCourse: "",
        };

        $scope.deletedClass = {
            selectedYear: "",
            selectedSemester: "",
            selectedClass: ""
        };

        $scope.addClassInfo = function() {
            var fd = new FormData();
            fd.append("year", $scope.addedClass.selectedYear);
            fd.append("semester", $scope.addedClass.selectedSemester);
            fd.append("course", $scope.addedClass.selectedCourse);

            $rootScope.sendData("/index.php/index/Admin/addClassInfo", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;
                    if ($rootScope.result === "success") {
                        $rootScope.addClass.successTip = true;
                        $timeout(function() {
                            $rootScope.addClass.successTip = false;
                        }, 2000);
                    } else if ($rootScope.result === "false") {
                        $rootScope.addClass.errorTip = true;
                        $timeout(function() {
                            $rootScope.addClass.errorTip = false;
                        }, 2000);
                    }
                }
            });
        };

        $scope.updateDeleteClassSelect = function(condition) {
            var temporarySemesters, temporaryAllClasses, temporaryClasses;
            if (condition === "semester") {
                temporarySemesters = $rootScope.filterExist($rootScope.allClasses, "year", $scope.deletedClass.selectedYear, "semester");
                $rootScope.deleteAllClass.semesters = $rootScope.filterDuplicate(temporarySemesters, "semester");
            } else if (condition === "class") {
                temporaryAllClasses = $rootScope.filterExist($rootScope.allClasses, "year", $scope.deletedClass.selectedYear, "");
                temporaryClasses = $rootScope.filterExist(temporaryAllClasses, "semester", $scope.deletedClass.selectedSemester, "class");
                $rootScope.deleteAllClass.classes = $rootScope.filterDuplicate(temporaryClasses, "class");
            }
        };

        $scope.deleteClassData = function() {
            var fd = new FormData();
            fd.append("year", $scope.deletedClass.selectedYear);
            fd.append("semester", $scope.deletedClass.selectedSemester);
            fd.append("class", $scope.deletedClass.selectedClass);

            $rootScope.sendData("/index.php/index/Admin/deleteClassData", fd, function() {
                if ($rootScope.xmlhttp.readyState == 4 && $rootScope.xmlhttp.status == 200) {
                    $rootScope.result = $rootScope.xmlhttp.responseText;
                    $scope.$apply(function() {
                        if ($rootScope.result === "success") {
                            $rootScope.deleteAllClass.successTip = true;
                            $timeout(function() {
                                $rootScope.deleteAllClass.successTip = false;
                            }, 2000);
                        } else if ($rootScope.result === "false") {
                            $rootScope.deleteAllClass.errorTip = true;
                            $timeout(function() {
                                $rootScope.deleteAllClass.errorTip = false;
                            }, 2000);
                        }
                    });
                }
            });
        };
    });
