// localStorage의 저장할 키 이름
const STORAGE_KEY = "todoListData";

// 할 일 목록을 담을 배열
// 자바스크립트 배열 : 모든 데이터 타입을 다 담을 수 있다
// 크기 가변
let todoList = [];

// 웹 문서가 로딩되면
$(document).ready(function () {
    // localStorage에 저장된 데이터 불러오기
    loadTodos();

    // 로딩된 할 일 목록을 화면에 출력
    renderTodos();

    // range 값 초기 숫자 표시
    $("#priorityValue").html($("#priorityRange").val());
    $("#importanceValue").html($("importanceRange").val());

    // 우선순위 값 변경 시 숫자 반영
    $("#priorityRange").change(function () {
        $("#priorityValue").html($("#priorityRange").val());
    });
    // 중요도 값 변경 시 숫자 반영
    $("#importanceRange").change(function () {
        $("#importanceValue").html($("#importanceRange").val());
    });
});

function loadTodos() {}

function renderTodos() {}
