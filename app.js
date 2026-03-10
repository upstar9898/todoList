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

    // 할 일 추가 버튼 클릭
    $("#addTodoBtn").click(function () {
        addTodo();
    });
    // 엔터 키 입력으로 할 일 추가
    $("#todoText").keydown(function (e) {
        if (e.keyCode == 13) {
            addTodo();
        }
    });
});

// 할 일 추가
function addTodo() {
    const text = $("#todoText").val().trim(); // 문자열은 주소값 저장, 주소값은 고정
    const priority = Number($("#priorityValue").text());
    const importance = Number($("#importanceValue").text());

    if (text === "") {
        // 공백 입력 방지
        alert("할 일 내용을 입력하세요!");
        $("#todoText").focus();
        return;
    }

    const newTodo = {
        id: Date.now(), // 할 일 고유번호(시간 : Date.now())
        text: text, // 할 일 내용
        priority: priority, // 우선순위
        importance: importance, // 중요도
        completed: false, // 완료여부
        createdAt: Date.now(), // 등록시간
    };

    // 할 일을 배열에 추가
    todoList.push(newTodo);
    console.log(todoList);

    // 정렬 (우선순위 + 중요도)
    sortTodos();

    // localStorage에 저장
    saveTodos();

    // 화면에 출력
    renderTodos();

    // 입력값들 초기화
    $("#todoText").val("");
    $("#priorityRange").val(3);
    $("#importanceRange").val(3);
    $("#priorityValue").text(3);
    $("#importanceValue").text(3);
}

function saveTodos() {
    // todoList 배열을 localStorage에 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
}

function sortTodos() {
    todoList.sort(function (a, b) {
        // 정렬 기준이 되는 함수
        const totalA = a.priority + a.importance;
        const totalB = b.priority + b.importance;
        if (totalB != totalA) {
            return totalB - totalA;
        }

        if (b.priority !== a.priority) {
            return b.priority - a.priority;
        }

        return a.createdAt - b.createdAt;
    });
    //     todoList.sort(function (a, b) {
    //     const totalA = a.priority + a.importance;
    //     const totalB = b.priority + b.importance;

    //     // 1. 총점이 높은 항목이 앞에 온다.
    //     if (totalA > totalB) {
    //       return -1;
    //     } else if (totalA < totalB) {
    //       return 1;
    //     }

    //     // 2. 총점이 같으면 우선순위가 높은 항목이 앞에 온다.
    //     if (a.priority > b.priority) {
    //       return -1;
    //     } else if (a.priority < b.priority) {
    //       return 1;
    //     }

    //     // 3. 총점과 우선순위가 모두 같으면 먼저 등록한 항목이 앞에 온다.
    //     if (a.createdAt < b.createdAt) {
    //       return -1;
    //     } else if (a.createdAt > b.createdAt) {
    //       return 1;
    //     }

    //     // 4. 완전히 같으면 순서를 바꾸지 않는다.
    //     return 0;
    //   });
}

function loadTodos() {}

function renderTodos(webTodoList) {
    // 할일 목록(todoList 배열)을 화면에 출력하는 함수
    const todoListTag = $("#todoList"); // 할 일 목록을 출력할 ul태그
    todoListTag.empty(); // todoListTag 안의 모든 자식태그를 지운다.

    if (todoList.length === 0) {
        $("#emptyMessage").show();
        return;
    } else {
        $("#emptyMessage").hide();
    }

    // 실제 할 일을 출력하는 부분
    todoList.forEach(function (todo) {
        const total = todo.priority + todo.importance;
        // 3항연산자
        // 조건식 ? 조건식이 참일 때 : 조건식이 거짓일 때
        const textClass = todo.completed ? "completed-text" : "";

        // 할 일의 완료/미완료 여부에 따라 badge의 색과 문자열을 다르게
        const statusBadge = todo.completed
            ? '<span class="badge bg-success">완료</span>'
            : '<span class="badge bg-secondary">미완료</span>';

        // 할 일의 완료/미완료 여부에 따라 버튼의 색과 문자열을 다르게
        const toggleBtnText = todo.completed ? "미완료로 변경" : "완료";
        const toggleBtnClass = todo.completed
            ? "btn-warning"
            : "btn-outline-success";

        const html = `
      <li class="list-group-item todo-item d-flex justify-content-between align-items-start">
        <div class="flex-grow-1 me-3">
          <div class="fw-bold ${textClass}">${escapeHtml(todo.text)}</div>
          <div class="badge-box mt-2">
            <span class="badge bg-primary">우선순위: ${todo.priority}</span>
            <span class="badge bg-danger">중요도: ${todo.importance}</span>
            <span class="badge bg-dark">총점: ${total}</span>
            ${statusBadge}
          </div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-sm ${toggleBtnClass} toggle-btn" data-id="${todo.id}">
            ${toggleBtnText}
          </button>
          <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${todo.id}">
            삭제
          </button>
        </div>
      </li>
    `;
        todoListTag.append(html); // 할 일을 출력
    });
}

// XSS 방지
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
