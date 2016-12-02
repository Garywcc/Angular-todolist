(function (window) {
	'use strict';

	var app=angular.module('myTodo', []);
	app.controller('Todo', ['$scope', function($scope){
		//ng-repeat里遍历对象，存放输入数据
		$scope.lists={};
		//输入数据
		$scope.list="";
		//item数量
		$scope.count=0;
		//lists的副本
		$scope.listsTmp1={}
		//lists的副本，存放输入框选中的数据
		$scope.listsTmp2={}
		//lists的副本，存放输入框未选中的数据
		$scope.listsTmp3={}
		//临时对象 存放哪些数据是被选中的
		$scope.tmp={};
		//是否选择状态
		$scope.statue=null;
		//添加任务
		$scope.addList=function(){
			if(!$scope.lists[$scope.list]){
				$scope.count++
			}
			//往listsTmp1对象里存放数据，用于all事件恢复全部事件列表
			$scope.listsTmp1[$scope.list]=$scope.list;
			//lists用于初始化事件列表
			$scope.lists[$scope.list]=$scope.list;
			//初始未被选中
			$scope.tmp[$scope.list]=null;	
		};
		$scope.removeList=function(_id){
			delete $scope.lists[_id]
			$scope.count--
		}
		$scope.changeClass=function(_id){
			if($scope.tmp[_id]=="checked"){
				$scope.tmp[_id]=null;
			}else{
				$scope.tmp[_id]="checked"
			}
			
		};
		//获取对象长度
		var getObjLength=function(obj){
			return Object.keys(obj).length;
		};
		$scope.chooseAll=function($event){
			$event.preventDefault(); 
			//选中所有
			for(var key in $scope.listsTmp3){	
				$scope.tmp[key]="checked";	
			}
			$scope.lists=$scope.listsTmp1;
			$scope.count=getObjLength($scope.listsTmp1)
			$scope.statue='';
		};
		$scope.chooseNotCheck=function($event){
			
			$event.preventDefault(); 
			//显示uncompleted的项目
			for(var key in $scope.listsTmp1){
				if($scope.tmp[key]){
					$scope.listsTmp3[key]=$scope.listsTmp1[key]
					$scope.count--
				}
				
			}
			$scope.lists=$scope.listsTmp3;
			
			$scope.count=getObjLength($scope.listsTmp3)
			$scope.statue='active'
		};
		$scope.chooseCheck=function($event){
			$event.preventDefault(); 
			//显示完成的
			for(var key in $scope.listsTmp3){
				for(var key1 in $scope.listsTmp1){
					if(key1!==key){
						$scope.listsTmp2[key1]=$scope.listsTmp1[key1]
					}
				}
			}
			
			$scope.count=getObjLength($scope.listsTmp2)
			$scope.lists=$scope.listsTmp2;
			$scope.statue='complete'
		};
		$scope.clearAll=function(){
			//清除完成的
			for(var key in $scope.lists){
				if($scope.tmp[key]){
					delete $scope.lists[key]
					$scope.count--
				}
				
			}

		};
	}]);
	

})(window);
