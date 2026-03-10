아래는 업로드하신 **HTML / CSS / JavaScript 소스를 기반으로 만든 `README.md` 예시**입니다.
**초보자가 코드만 보고도 자습할 수 있도록 문법 설명을 매우 촘촘하게 포함**했습니다.

---

# 📌 TodoList 프로젝트 (jQuery + LocalStorage)

이 프로젝트는 **HTML + CSS + JavaScript(jQuery)** 를 사용하여 만든 간단한 **TodoList 웹 애플리케이션**이다.

이 프로젝트를 통해 다음 기술을 학습할 수 있다.

- HTML 입력 폼 구성
- Bootstrap UI 활용
- jQuery DOM 제어
- JavaScript 배열 처리
- LocalStorage 데이터 저장
- Todo 우선순위 정렬 알고리즘
- 이벤트 처리
- XSS 방지 처리

---

# 1. 프로젝트 구조

```
project
 ├─ todoList.html
 ├─ style.css
 ├─ app.js
 └─ favicon.ico
```

| 파일          | 설명               |
| ------------- | ------------------ |
| todoList.html | 웹 페이지 구조     |
| style.css     | 사용자 정의 스타일 |
| app.js        | TodoList 로직      |
| favicon.ico   | 브라우저 탭 아이콘 |

---

# 2. HTML 구조 설명

파일: **todoList.html**

## 기본 HTML 구조

```html
<!doctype html>
<html lang="ko"></html>
```

### 의미

| 태그              | 설명               |
| ----------------- | ------------------ |
| `<!doctype html>` | HTML5 문서 선언    |
| `<html>`          | HTML 문서의 루트   |
| `lang="ko"`       | 문서 언어 (한국어) |

---

## meta 태그

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 의미

| 태그     | 설명               |
| -------- | ------------------ |
| charset  | 문자 인코딩        |
| viewport | 모바일 반응형 설정 |

---

## Bootstrap 적용

```html
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
/>
```

### Bootstrap

Bootstrap은 **CSS 프레임워크**이다.

장점

- 반응형 디자인
- 미리 만들어진 UI
- 빠른 개발

---

## favicon (즐겨찾기 아이콘)

```html
<link rel="icon" type="image/x-icon" href="favicon.ico" />
```

브라우저 탭 아이콘을 설정한다.

---

## 사용자 CSS 연결

```html
<link rel="stylesheet" href="style.css" />
```

---

# 3. Todo 입력 UI

```html
<input
    type="text"
    id="todoText"
    class="form-control"
    placeholder="예: 강의자료 만들기"
/>
```

### input 속성

| 속성        | 설명             |
| ----------- | ---------------- |
| type="text" | 문자열 입력      |
| id          | JS에서 접근      |
| class       | Bootstrap 스타일 |
| placeholder | 힌트             |

---

# 4. range input

```html
<input
    type="range"
    id="priorityRange"
    class="form-range"
    min="1"
    max="5"
    value="3"
/>
```

### 의미

슬라이더 형태 입력

| 속성  | 설명   |
| ----- | ------ |
| min   | 최소값 |
| max   | 최대값 |
| value | 기본값 |

---

# 5. TodoList 출력 영역

```html
<ul id="todoList" class="list-group"></ul>
```

Todo 목록이 **동적으로 생성**된다.

JavaScript가 `<li>`를 생성한다.

---

# 6. jQuery 연결

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

jQuery는 JavaScript 라이브러리이다.

DOM 조작을 쉽게 만든다.

---

# 7. JavaScript 구조

파일: **app.js**

---

# 8. 상수 선언

```javascript
const STORAGE_KEY = "todoListData";
```

### const

변하지 않는 변수

---

# 9. 배열 선언

```javascript
let todoList = [];
```

JavaScript 배열 특징

- 크기 가변
- 다양한 타입 저장 가능

예

```
[1, "문자", true, {name:"홍길동"}]
```

---

# 10. document ready

```javascript
$(document).ready(function () {
```

### 의미

HTML 문서가 완전히 로딩된 후 실행된다.

jQuery 문법

```
$(document).ready()
```

---

# 11. LocalStorage 데이터 로딩

```javascript
loadTodos();
renderTodos();
```

---

# 12. jQuery 값 읽기

```javascript
$("#priorityRange").val();
```

### 의미

| 코드  | 설명          |
| ----- | ------------- |
| $     | jQuery 선택자 |
| #     | id 선택       |
| val() | value 읽기    |

---

# 13. HTML 값 변경

```javascript
$("#priorityValue").html(...)
```

html() 함수

요소 내부 HTML 변경

---

# 14. 이벤트 처리

```javascript
$("#addTodoBtn").click(function () {
    addTodo();
});
```

### 의미

버튼 클릭 시

```
addTodo()
```

실행

---

# 15. 엔터키 이벤트

```javascript
$("#todoText").keydown(function (e) {
    if (e.keyCode == 13) {
        addTodo();
    }
});
```

### keyCode

| 키    | 코드 |
| ----- | ---- |
| Enter | 13   |

---

# 16. 이벤트 위임

```javascript
$(document).on("click", ".toggle-btn", function ()
```

### 이유

동적으로 생성된 요소는

```
click()
```

이벤트가 동작하지 않는다.

그래서

```
document.on()
```

사용

---

# 17. Todo 삭제

```javascript
todoList = todoList.filter(function (todo) {
    return todo.id !== id;
});
```

### filter()

조건을 만족하는 배열만 반환

예

```
[1,2,3,4].filter(x=>x>2)

결과
[3,4]
```

---

# 18. Todo 상태 변경

```javascript
todoList = todoList.map(function (todo) {
```

### map()

배열 변환

---

## 핵심 코드

```javascript
todo.completed = !todo.completed;
```

### !

논리 NOT

| 값    | 결과  |
| ----- | ----- |
| true  | false |
| false | true  |

---

# 19. Todo 추가

```javascript
const newTodo = {
    id: Date.now(),
    text: text,
    priority: priority,
    importance: importance,
    completed: false,
    createdAt: Date.now(),
};
```

### 객체(Object)

Key-Value 구조

---

# 20. 배열 추가

```javascript
todoList.push(newTodo);
```

push()

배열 끝에 추가

---

# 21. LocalStorage 저장

```javascript
localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
```

### JSON.stringify()

객체 → 문자열

LocalStorage는 문자열만 저장 가능

---

# 22. 데이터 불러오기

```javascript
JSON.parse(savedTodos);
```

문자열 → 객체

---

# 23. 정렬 알고리즘

```javascript
todoList.sort(function (a, b)
```

### sort()

배열 정렬

---

## 정렬 기준

1️⃣ 우선순위 + 중요도
2️⃣ 우선순위
3️⃣ 등록 시간

---

## 비교 함수

```
return totalB - totalA;
```

| 결과 | 의미   |
| ---- | ------ |
| 음수 | a 먼저 |
| 양수 | b 먼저 |

---

# 24. Todo 출력

```javascript
todoList.forEach(function (todo)
```

### forEach()

배열 반복

---

# 25. 삼항 연산자

```javascript
조건 ? 참 : 거짓;
```

예

```javascript
todo.completed ? "완료" : "미완료";
```

---

# 26. 템플릿 문자열

```
`문자열`
```

변수 삽입

```
${변수}
```

예

```
${todo.priority}
```

---

# 27. XSS 공격 방지

```javascript
function escapeHtml(text)
```

사용자 입력에

```
<script>
```

같은 코드 삽입을 방지

---

## 변환 예

| 문자 | 변환   |
| ---- | ------ |
| `<`  | `&lt;` |
| `>`  | `&gt;` |

---

# 28. CSS 설명

파일: **style.css**

---

## 배경색

```css
body {
    background-color: #f8f9fa;
}
```

---

## 카드 둥근 모서리

```css
.todo-card {
    border-radius: 16px;
}
```

---

## 완료된 할일

```css
.completed-text {
    text-decoration: line-through;
}
```

효과

```
취소선
```

---

# 29. 전체 동작 흐름

```
페이지 로드
   ↓
localStorage 로딩
   ↓
배열 정렬
   ↓
화면 출력
   ↓
사용자 입력
   ↓
Todo 추가
   ↓
배열 저장
   ↓
재렌더링
```

---

# 30. 학습 포인트

이 프로젝트에서 중요한 개념

### JavaScript

- 배열
- 객체
- map
- filter
- sort
- forEach

### 브라우저 API

- LocalStorage

### jQuery

- DOM 선택
- 이벤트 처리
- 동적 HTML 생성

---

# 31. 추가 개선 아이디어

추가 기능

- Todo 수정
- 완료 목록 필터
- 드래그 정렬
- 검색 기능
- 서버 저장 (DB)

---
