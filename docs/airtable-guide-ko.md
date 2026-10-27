# Airtable 콘텐츠 관리 가이드

사이트는 빌드할 때 Airtable에서 작품, CV, 소개를 읽는다. 브라우저는 Airtable에 직접 연결하지 않는다.

## 현재 테이블

- `collections`: 작품 데이터
- `cv`: 경력 및 활동 데이터
- `intro`: 프로필 소개

`collections`는 테이블 이름이다. 테이블 안 각 행은 작품 한 개다.

## 작품 테이블: `collections`

| 필드 | Airtable 유형 | 용도 |
| --- | --- | --- |
| `category` | 단일 선택 | `design`, `fine-arts`, `photography-video`. `TBA` 또는 공란은 사이트에서 숨김 |
| `title` | 한 줄 텍스트 | 영문 제목 |
| `title ko` | 한 줄 텍스트 | 한국어 제목. 비우면 한국어 제목 숨김 |
| `project term` | 한 줄 텍스트 | 연도 또는 작업 기간 |
| `client` | 긴 텍스트 | 고객, 개인 작업 또는 협업 정보 |
| `client ko` | 한 줄 텍스트 | 고객 또는 협업 정보의 한국어 |
| `medium` | 한 줄 텍스트 | 분야나 매체. 쉼표로 구분 |
| `medium ko` | 한 줄 텍스트 | 분야나 매체의 한국어. 쉼표로 구분 |
| `hero image` | 첨부파일 | 카드와 상세 페이지 대표 이미지 |
| `image 2`–`image 10` | 첨부파일 | 상세 페이지 추가 이미지. 번호 순으로 표시 |
| `top description` | 긴 텍스트 | 작품 설명 블록 1 |
| `middle description` | 긴 텍스트 | 작품 설명 블록 2 |
| `bottom description` | 긴 텍스트 | 작품 설명 블록 3 |
| `tags` | 한 줄 텍스트 | 쉼표로 구분한 태그 |

작품 순서는 `collections`의 `Grid view` 행 순서를 따른다. Airtable에서 행을 위아래로 옮기면 사이트 순서도 바뀐다. `order` 필드는 필요 없다. `AIRTABLE_VIEW_ID`가 지정한 Airtable view의 순서를 사용한다. category가 비었거나 `TBA`인 행은 표시하지 않는다.

상세 페이지는 대표 이미지 하나만 위에 표시하고, 추가 이미지는 순서대로 세로로 쌓는다. 각 이미지는 최대 화면 높이의 70%(최대 680px)로 제한한다. 대표 이미지가 GIF면 그것만 재생한다. 갤러리의 GIF는 Airtable 정지 썸네일로 표시한다. 목록 미리보기는 대표 GIF를 계속 재생한다. Markdown 접두사나 `**` 표시는 위치나 레이아웃을 제어하지 않는다.

`medium` 또는 `tags`에 `Web Design`을 넣고 `top description`에 전체 웹사이트 주소를 입력하면 목록 카드에 사이트 미리보기가, 상세 페이지에 인터랙티브 사이트가 표시된다. 외부 사이트가 iframe 임베드를 차단하면 새 탭 링크만 사용할 수 있다. 임의의 외부 사이트는 보안상 HTML Canvas 안에서 직접 실행할 수 없으며, iframe은 원본 사이트 코드를 그대로 보여주는 방식이다.

`top description`은 대표 이미지 뒤, `middle description`은 상세 이미지 가운데, `bottom description`은 마지막 이미지 뒤에 표시한다.

`client`와 `medium`의 한국어 값은 각각 `client ko`, `medium ko`에 입력한다. 사이트는 이 값을 영어 값 아래에 표시한다. 클라이언트 접두어는 표시하지 않는다. 개인 작업, 개인 외주, 협업은 Airtable `client` 필드에 적은 이름이나 설명만 표시한다.

목록 카드는 Airtable의 최대 3000px 이미지 변형을 사용한다. 상세 페이지는 원본 이미지를 사용한다. 파일은 사이트 저장소에 복사하지 않는다. Airtable 첨부 URL은 약 2시간 뒤 만료되므로 GitHub Actions가 매시간 사이트를 다시 빌드해 URL을 갱신한다.

### 카테고리

- `design`: 디자인 작업
- `fine-arts`: 미술, 일러스트, 글 작업
- `photography-video`: 사진, 영상 제작

`medium`과 `medium ko`는 작품 카드와 상세 페이지에 표시한다. 작품 목록 필터는 없다.

## CV 테이블: `cv`

| 필드 | Airtable 유형 | 용도 |
| --- | --- | --- |
| `project term` | 긴 텍스트 | 연도 또는 기간 |
| `project name` | 서식 있는 텍스트 | 영문 활동명 |
| `project ko` | 서식 있는 텍스트 | 한국어 활동명 |
| `organization` | 긴 텍스트 | 회사, 학교, 기관 |
| `organization ko` | 긴 텍스트 | 한국어 회사, 학교, 기관 |
| `description` | 긴 텍스트 | 영문 상세 설명 |
| `description ko` | 긴 텍스트 | 한국어 상세 설명 |
| `postscript` | 긴 텍스트 | 영문 추가 소개 |
| `postscript ko` | 긴 텍스트 | 한국어 추가 소개 |

CV 항목은 `cv` 테이블의 `Grid view` 행 순서대로 표시한다. Airtable에서 행을 위아래로 옮겨 순서를 바꾼다. `order` 필드는 필요 없다. 비어 있는 행은 표시하지 않는다.

## 소개 테이블: `intro`

프로필 소개와 분야별 설명은 한 행에서 관리한다. 분야명은 웹사이트에 영어로 고정되어 있으므로 Airtable 필드로 관리하지 않는다.

| 필드 | Airtable 유형 | 용도 |
| --- | --- | --- |
| `intro` | 긴 텍스트 | 영문 프로필 소개 |
| `intro ko` | 긴 텍스트 | 한국어 프로필 소개 |
| `postscript ko` | 긴 텍스트 | 한국어 추가 소개 |
| `design description` / `design description ko` | 긴 텍스트 | Design 분야 설명 |
| `fine arts description` / `fine arts description ko` | 긴 텍스트 | Fine Arts 분야 설명 |
| `photography video description` / `photography video description ko` | 긴 텍스트 | Photography & Video 분야 설명 |

영문 `postscript`는 `cv` 테이블의 `postscript` 필드에서 읽는다.
분야 페이지는 영어 제목 왼쪽, 영어·한국어 설명 오른쪽에 표시한다. 제목은 사이트 코드에 고정되어 있고 설명만 `intro` 행의 해당 분야 필드에서 관리한다.

## 동기화와 배포

Personal Access Token에는 `data.records:read` 권한과 대상 Base 접근 권한이 필요하다. 비밀 토큰을 `VITE_` 변수나 채팅에 넣지 않는다.

프로젝트 루트 `.env`에 다음 값을 둔다.

```env
PORTFOLIO_TOKEN=발급한_토큰
AIRTABLE_BASE_ID=앱_ID
AIRTABLE_TABLE_NAME=collections
AIRTABLE_VIEW_ID=viwraXnT87X1NKzpC
AIRTABLE_CV_TABLE_NAME=cv
AIRTABLE_CV_VIEW_ID=Grid view
AIRTABLE_INTRO_TABLE_NAME=intro
```

로컬에서 `npm run sync`를 실행하면 `src/data/airtable-projects.json`, `src/data/airtable-cv.json`을 갱신한다. 스크립트는 Airtable 레코드를 수정하지 않는다.

GitHub Actions 배포 workflow도 위 테이블 이름을 사용한다. GitHub 저장소의 Actions secret에 `PORTFOLIO_TOKEN`을 설정한다. 배포는 매시간 자동 실행되며, 아래 Airtable 자동화를 설정하면 `intro` 변경 직후에도 실행된다.

### `intro` 변경 시 자동 배포

GitHub 저장소에 `airtable_updated` repository dispatch를 보내도록 Airtable 자동화를 설정한다. GitHub 토큰은 Airtable 자동화의 secret으로 저장하고 스크립트 코드나 필드에는 넣지 않는다.

1. GitHub에서 fine-grained personal access token을 만든다. 대상은 `hannah-yoo/portfolio` 저장소 하나로 제한하고 `Contents: Read and write` 권한만 준다.
2. Airtable Automations에서 `When record updated` 트리거를 만든다. `intro` 테이블과 `design description`, `design description ko`, `fine arts description`, `fine arts description ko`, `photography video description`, `photography video description ko` 필드를 지정한다.
3. `Run a script` 작업을 추가한다. 입력 변수 `recordId`를 트리거 레코드의 Airtable record ID에 연결하고, secret 이름을 `githubToken`으로 등록한다.
4. 아래 스크립트를 붙여넣고 자동화를 켠다.

```js
const { recordId } = input.config();
const githubToken = input.secret("githubToken");

const response = await fetch("https://api.github.com/repos/hannah-yoo/portfolio/dispatches", {
  method: "POST",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${githubToken}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
  body: JSON.stringify({
    event_type: "airtable_updated",
    client_payload: { record_id: recordId },
  }),
});

if (!response.ok) {
  throw new Error(`GitHub dispatch failed (${response.status}): ${await response.text()}`);
}
```

GitHub Actions가 Airtable 최신 데이터를 다시 읽어 사이트를 빌드·배포한다. 배포에는 보통 1–2분이 걸린다. 매시간 자동 배포는 자동화 실패 시를 위한 예비 동기화로 유지한다. `collections`나 `cv`도 즉시 반영하려면 해당 테이블을 감시하는 별도 Airtable 자동화를 만들고 같은 dispatch를 보낸다.
