'use strict';

angular.module('myApp')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state( 'dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard.html",
        controller: "DashboardController",
        data: {
          needLogin: true
      }
  })


    .state('dashboard.articles', {
        url: '/articles',
        templateUrl: 'dashboard/articles.html',
        controller: 'ArticlesController',
        data: {
          needLogin: true
      }
  })


    .state('dashboard.addarticle', {
        url: '/addarticle',
        templateUrl: 'dashboard/addarticle.html',
        controller: 'AddArticleController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.editarticle', {
        url: '/editarticle/:id',
        templateUrl: 'dashboard/editarticle.html',
        controller: 'EditArticleController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.previewarticle', {
        url: '/previewarticle/:id',
        templateUrl: 'dashboard/previewArticle.html',
        controller: 'PreviewArticleController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.createfield', {
        url: '/createfield',
        templateUrl: 'dashboard/needs/createField.html',
        controller: 'CreateFieldController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.createproject', {
        url: '/createproject',
        templateUrl: 'dashboard/needs/createProject.html',
        controller: 'CreateProjectController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.needs', {
        url: '/needs',
        templateUrl: 'dashboard/needs/needs.html',
        controller: 'NeedsController',
        data: {
          needLogin: true
      }
  })


    .state('dashboard.createneed', {
        url: '/createneed',
        templateUrl: 'dashboard/needs/createNeed.html',
        controller: 'CreateNeedController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.editneed', {
        url: '/editneed/:id',
        templateUrl: 'dashboard/needs/editNeed.html',
        controller: 'EditNeedController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.previewneed', {
        url: '/previewneed/:id',
        templateUrl: 'dashboard/needs/previewNeed.html',
        controller: 'PreviewNeedController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.createquote', {
        url: '/createquote',
        templateUrl: 'dashboard/quotes/createQuote.html',
        controller: 'CreateQuoteController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.quotes', {
        url: '/quotes',
        templateUrl: 'dashboard/quotes/quotes.html',
        controller: 'QuotesController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.createteam', {
        url: '/createteam',
        templateUrl: 'dashboard/team/createTeamMember.html',
        controller: 'CreateTeamMemberController',
        data: {
          needLogin: true
      }
  })

    .state('dashboard.members', {
        url: '/members',
        templateUrl: 'dashboard/team/teamMembers.html',
        controller: 'TeamMembersController',
        data: {
          needLogin: true
      }
  })



}])


.controller('DashboardController', ['$scope', '$http', '$rootScope', '$modal', function($scope, $http, $rootScope, $modal) { 

    $scope.options = {
        height: 500,
        focus: true,
    
    toolbar: [
    ['edit',['undo','redo']],
    ['headline', ['style']],
    ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            // ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['insert', ['link','picture','video','hr', 'table']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
            ]
        };

        $scope.imageUpload = function(file) {
            sendFile(file[0]);
        }

        $scope.paste = function(e) { 
            console.log('Called event paste'); 
        }


        function sendFile(file) {
            var data = new FormData();
            data.append("file", file);
            $.ajax({
                data: data,
                type: "POST",
                url: "api/summerUpload.php",
                cache: false,
                contentType: false,
                processData: false,
                success: function(url) {
                    $('#summernote').summernote('insertImage', url);
                }
            });
        };

        $scope.publishArticle = function(article) {

            $http.post('api/publishArticle.php', article.id).success(function(data) {
       
            $rootScope.$state.go('dashboard.articles');
    });
        };

        $scope.publishNeed = function(need) {
            $http.post('api/needs/publishNeed.php', need.id).success(function(data) {
              $rootScope.$state.go('dashboard.needs');
            });
        };

        $scope.getToday = function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            } 

            if(mm<10) {
                mm='0'+mm
            } 

            today = dd+'.'+mm+'.'+yyyy;
            return today
        };



$scope.onFile = function(blob) {
  $scope.cropImage(blob);
}

$scope.cropWidth = 800;
$scope.aspectRatio = 16 /10;


$scope.cropImage = function(_blob) {
    $scope.modalInstance = $modal.open({
      templateUrl: 'dashboard/cropModal.html',
      controller: 'CropController',
      size: 'lg',
      resolve: {
        blob: function () {
          return _blob;
        },
        aspectRatio: function () {
          return $scope.aspectRatio;
        },
        cropWidth: function (){
          return $scope.cropWidth;
        }
      }        
    })
    $('input[type="file"]').val(null);
  };



  

}])


.controller('CropController', ['$scope', '$http', '$modalInstance', '$animate', 'blob', 'Cropper', '$timeout', 'cropWidth', 'aspectRatio', '$modalStack', function($scope, $http, $modalInstance, $animate, blob, Cropper, $timeout, cropWidth, aspectRatio, $modalStack) {
    $scope.blob = blob;
    $scope.cropWidth = cropWidth;
    $scope.aspectRatio = aspectRatio;
    var file, data;
    Cropper.encode((file = blob)).then(function(dataUrl) {
      $scope.dataUrl = dataUrl;
      $timeout(showCropper);  // wait for $digest to set image's src
    });


$scope.cropper = {};
$scope.cropperProxy = 'cropper.first';





$scope.preview = function() {
    if (!file || !data) return;
    Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
      ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
    });
  };


  $scope.clear = function(degrees) {
    if (!$scope.cropper.first) return;
    $scope.cropper.first('clear');
  };

  $scope.scale = function(width) {
    Cropper.crop(file, data)
      .then(function(blob) {
        console.log($scope.$parent);
        return Cropper.scale(blob, {width: $scope.cropWidth});
      })
      .then(Cropper.encode).then(function(dataUrl) {
        ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
      });
  }

  $scope.options = {
    maximize: true,
    aspectRatio: $scope.aspectRatio,
    crop: function(dataNew) {
      data = dataNew;
    }
  };


$scope.showEvent = 'show';
$scope.hideEvent = 'hide';

  function showCropper() { $scope.$broadcast($scope.showEvent); }
  function hideCropper() { $scope.$broadcast($scope.hideEvent); }


$scope.sendFile = function(file) {
  if (!file) return
            var data = new FormData();
            data.append("file", file);
            $.ajax({
                data: data,
                type: "POST",
                url: "api/croppedImage.php",
                cache: false,
                contentType: false,
                processData: false,
                success: function(url) {
                    $scope.$parent.lastSendedimage = url;
                    $modalStack.dismissAll()
                    $scope.$apply();
                    console.log(url);
                }
            });
        };


}])










.controller('ArticlesController', ['$scope', '$http', '$modal', function($scope, $http, $modal) { 

    $http.post('api/articleTitles.php').success(function(data) {
        $scope.articles = data;
    });


    $scope.deleteArticle = function(_article) {
        var modalInstance = $modal.open({
          templateUrl: 'dashboard/deleteArticleModal.html',
          controller: 'DeleteArticleController',
          size: 'lg',
          resolve: {
            article: function () {
              return _article;
          }
      }        
  })
    };



}])


.controller('AddArticleController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {




    $scope.$parent.cropWidth = 800;
    $scope.$parent.aspectRatio = 16/10;
    

    $scope.setArticleImage = function(member) {
        var input = $('#image');
        input.click();
    };

    $scope.article = {};
    $scope.article.date = $scope.getToday();

    $scope.createArticle = function(need) {
        $scope.article.image_url = $scope.$parent.lastSendedimage;
        $http.post('api/createArticle.php', $scope.article).success(function(data) {
            $scope.lastId = data;
            $scope.$parent.lastSendedimage = "";
            console.log(data);
            // $scope.$state.go('dashboard.previewarticle', {id: $scope.lastId});
        });
    };

}])

.controller('EditArticleController', ['$scope', '$http', '$stateParams', '$rootScope', function($scope, $http, $stateParams, $rootScope) {

    var articleId = $stateParams.id;
    $scope.$parent.cropWidth = 800;
    $scope.$parent.aspectRatio = 16/10;

    $http.post('api/readArticle.php', articleId).success(function(data) {
        $scope.article = data;
    });

    $scope.editArticle = function() {
      $scope.article.image_url = $scope.$parent.lastSendedimage;
        $http.post('api/editArticle.php', $scope.article).success(function(data) {
            var articleId = data;
            $scope.$parent.lastSendedimage = "";
            $scope.$state.go('dashboard.previewarticle', {id: articleId})
        });
    }

    
   

    $scope.setArticleImage = function(member) {
        var input = $('#image');
        input.click();
    };


}])

.controller('PreviewArticleController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

    var articleId = $stateParams.id;
    $http.post('api/readArticle.php', articleId).success(function(data) {
        $scope.article = data;
        var art = $( ".article-text" );
        var html = $.parseHTML( $scope.article["text"] )
        art.append( html );
    });

    $scope.setMainImage = function(article) {

        var input = $('#mainimage')
        input.click();


        input.change(function(){

            var fd = new FormData();    
            fd.append( 'file', input[0].files[0] );
            fd.append( 'id', article.id );
            $.ajax({
              url: 'api/mainImageUpload.php',
              data: fd,
              processData: false,
              contentType: false,
              type: 'POST',
              success: function(data){
                $scope.$apply(function () {
                    $scope.article.image_url = data;
                });
                
            }
        });



        });


    }
}])


.controller('DeleteArticleController', ['$scope', '$http', '$modalInstance', '$animate', 'article', function($scope, $http, $modalInstance, $animate, article) {
    $scope.article = article;


}])



.controller('CreateFieldController', ['$scope', '$http', function($scope, $http) {

    $scope.$parent.cropWidth = 150;
    $scope.$parent.aspectRatio = 1/1;

    $scope.field = {};
    $scope.createField = function(field) {
        $scope.field.image_url = $scope.lastSendedimage;
        console.log($scope.field.image_url);
        $http.post('api/needs/createField.php', $scope.field).success(function(data) {
            $scope.answer = data;
            $scope.fieldname = "";
            $scope.$parent.lastSendedimage = '';
            // $scope.member.name = "";
            // $scope.member.status = "";
        });
    };

    $scope.setFieldImage = function(member) {
        var input = $('#image');
        input.click();
    };










    // $scope.fieldname = "";
    // $scope.createField = function(name) {

    //     $http.post('api/needs/createField.php', name).success(function(data) {
    //         $scope.answer = data;
    //         $scope.fieldname = "";
    //     });
        

    // }


    

}])

.controller('CreateProjectController', ['$scope', '$http', function($scope, $http) {

    $scope.projectname = "";

    $http.post('api/needs/getFields.php', name).success(function(data) {
        $scope.fields = data;
    });


    $scope.createProject = function(name, id) {
        var project = {};
        project.title = name;
        project.id = id;
        $http.post('api/needs/createProject.php', project).success(function(data) {
            $scope.answer = data;
            $scope.projectname = "";
        });

    }


    

}])

.controller('CreateNeedController', ['$scope', '$http', function($scope, $http) {

  $scope.$parent.cropWidth = 800;
    $scope.$parent.aspectRatio = 16/10;

    $scope.need = {};
    $scope.need.date = $scope.getToday();
    $http.post('api/needs/getFields.php', name).success(function(data) {
        $scope.fields = data;
    });

    $scope.getProjects = function(id) {
        $http.post('api/needs/getProjects.php', id).success(function(data) {
            $scope.projects = data;
        });
    };


$scope.setNeedImage = function() {
        var input = $('#image');
        input.click();
    };



    $scope.createNeed = function(need) {
        $scope.need.image_url = $scope.$parent.lastSendedimage;
        $http.post('api/needs/createNeed.php', need).success(function(data) {
            alert(data);
            $scope.lastId = data;
            $scope.$parent.lastSendedimage = "";
            $scope.$state.go('dashboard.previewneed', {id: $scope.lastId});
        });
    };

}])


.controller('NeedsController', ['$scope', '$http', '$modal', function($scope, $http, $modal) { 

    $http.post('api/needs/getNeeds.php').success(function(data) {
        $scope.needs = data;
    });


    $scope.deleteNeed = function(_need) {
        var modalInstance = $modal.open({
          templateUrl: 'dashboard/needs/deleteNeedModal.html',
          controller: 'DeleteNeedController',
          size: 'lg',
          resolve: {
            need: function () {
              return _need;
          }
      }        
  })
    };



}])


.controller('DeleteNeedController', ['$scope', '$http', '$modalInstance', '$animate', 'need', function($scope, $http, $modalInstance, $animate, need) {
    $scope.need = need;


}])



.controller('EditNeedController', ['$scope', '$http', '$stateParams', '$rootScope', function($scope, $http, $stateParams, $rootScope) {

    var needId = $stateParams.id;

    $http.post('api/needs/getNeed.php', needId).success(function(data) {
        $scope.need = data[0];
    });


    $http.post('api/needs/getFields.php', name).success(function(data) {
        $scope.fields = data;
    });

    $scope.getProjects = function(id) {
        $http.post('api/needs/getProjects.php', id).success(function(data) {
            $scope.projects = data;
        });
    };



    $scope.editNeed = function() {
        $http.post('api/needs/editNeed.php', $scope.need).success(function(data) {
            var needId = data;
            console.log(data);
            $rootScope.$state.go('dashboard.previewneed', {id: needId})
        });
    }

}])

.controller('PreviewNeedController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

    var needId = $stateParams.id;
    $http.post('api/needs/getNeed.php', needId).success(function(data) {
        $scope.need = data[0];
        var art = $( ".article-text" );
        var html = $.parseHTML( $scope.need["text"] )
        art.append( html );
    });

    $scope.setMainNeedImage = function(need) {

        var input = $('#mainimage');
        input.click();
        input.change(function(){

            var fd = new FormData();    
            fd.append( 'file', input[0].files[0] );
            fd.append( 'id', need.id );
            $.ajax({
              url: 'api/needs/mainNeedImageUpload.php',
              data: fd,
              processData: false,
              contentType: false,
              type: 'POST',
              success: function(data){
                $scope.$apply(function () {
                    $scope.need.image_url = data;
                });
                
            }
        });
        });


    }
}])


.controller('CreateQuoteController', ['$scope', '$http', function($scope, $http) {

    $scope.quote = {};
    $scope.createQuote = function(quote) {

        $http.post('api/quotes/createQuote.php', quote).success(function(data) {
            $scope.answer = data;
            $scope.quote.text = "";
            $scope.quote.author = "";
        });
        

    }


    

}])


.controller('QuotesController', ['$scope', '$http', '$modal', function($scope, $http, $modal) { 

    $http.post('api/quotes/getQuotes.php').success(function(data) {
        $scope.quotes = data;
    });

    $scope.deleteQuote = function(_quote) {
        var modalInstance = $modal.open({
          templateUrl: 'dashboard/quotes/deleteQuoteModal.html',
          controller: 'DeleteQuoteController',
          size: 'lg',
          resolve: {
            quote: function () {
              return _quote;
          }
      }        
  })
    };





}])


.controller('DeleteQuoteController', ['$scope', '$http', '$modalInstance', '$animate', 'quote', function($scope, $http, $modalInstance, $animate, quote) {
    $scope.quote = quote;
}])

.controller('CreateTeamMemberController', ['$scope', '$http', function($scope, $http) {
    $scope.$parent.cropWidth = 300;
    $scope.$parent.aspectRatio = 1/1;
    $scope.member = {};
    $scope.createTeamMember = function(member) {
        $scope.member.image_url = $scope.lastSendedimage;
        $http.post('api/team/createTeamMember.php', member).success(function(data) {
            $scope.answer = data;
            $scope.member.id = data;
            $scope.$parent.lastSendedimage = '';
            $scope.$parent.cropWidth = 100;
            // $scope.member.name = "";
            // $scope.member.status = "";
        });
    };

    $scope.setMemberImage = function(member) {
        var input = $('#image');
        input.click();
    };
}])

.controller('TeamMembersController', ['$scope', '$http', '$modal', function($scope, $http, $modal) { 

    $http.post('api/team/getMembers.php').success(function(data) {
        $scope.team = data;
    });


    $scope.deleteMember = function(_member) {
        var modalInstance = $modal.open({
          templateUrl: 'dashboard/team/deleteMemberModal.html',
          controller: 'DeleteMemberController',
          size: 'lg',
          resolve: {
            member: function () {
              return _member;
          }
      }        
  })
    };



}])

.controller('DeleteMemberController', ['$scope', '$http', '$modalInstance', '$animate', 'member', function($scope, $http, $modalInstance, $animate, member) {
    $scope.member = member;
}])

