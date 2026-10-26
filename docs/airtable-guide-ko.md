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

한 이미지 필드 칸에 첨부파일을 두 개 넣으면 첨부 순서대로 왼쪽·오른쪽에 나란히 표시한다. 한 개만 넣으면 전체 너비로 표시한다. 세 개 이상이면 첫 이미지를 크게 왼쪽에 두고 나머지를 오른쪽에 세로 타일로 쌓는다. 각 타일은 첨부 순서를 따른다. Markdown 접두사나 `**` 표시는 위치나 레이아웃을 제어하지 않는다.

상세 페이지 대표 이미지와 화면 비율이 같은 `image 2`–`image 10` 사진은 대표 이미지 영역에서 1.5초 간격으로 자동 전환한다. 비율이 다른 사진은 자동 전환에서 제외하고 상세 이미지로만 표시한다.

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
| `order` | 긴 텍스트 | CV 항목 순서. 숫자를 입력 |
| `project term` | 긴 텍스트 | 연도 또는 기간 |
| `project name` | 서식 있는 텍스트 | 영문 활동명 |
| `project ko` | 서식 있는 텍스트 | 한국어 활동명 |
| `organization` | 긴 텍스트 | 회사, 학교, 기관 |
| `organization ko` | 긴 텍스트 | 한국어 회사, 학교, 기관 |
| `description` | 긴 텍스트 | 영문 상세 설명 |
| `description ko` | 긴 텍스트 | 한국어 상세 설명 |
| `postscript` | 긴 텍스트 | 영문 추가 소개 |
| `postscript ko` | 긴 텍스트 | 한국어 추가 소개 |

`order`가 작은 항목부터 표시한다. 비어 있는 행은 표시하지 않는다. 기존 `year`와 `project` 열은 Airtable AI로 이름을 바꾸고, 기존 값을 보존한다.

## 소개 테이블: `intro`

소개글과 세 분야 문구는 한 행에서 관리한다.

| 필드 | Airtable 유형 | 용도 |
| --- | --- | --- |
| `intro` | 긴 텍스트 | 영문 프로필 소개 |
| `intro ko` | 긴 텍스트 | 한국어 프로필 소개 |
| `postscript ko` | 긴 텍스트 | 한국어 추가 소개 |
| `design title` / `design title ko` | 한 줄 텍스트 | Design 분야 제목 |
| `design description` / `design description ko` | 긴 텍스트 | Design 분야 설명 |
| `fine arts title` / `fine arts title ko` | 한 줄 텍스트 | Fine Arts 분야 제목 |
| `fine arts description` / `fine arts description ko` | 긴 텍스트 | Fine Arts 분야 설명 |
| `photography video title` / `photography video title ko` | 한 줄 텍스트 | Photography & Video 분야 제목 |
| `photography video description` / `photography video description ko` | 긴 텍스트 | Photography & Video 분야 설명 |

영문 `postscript`는 `cv` 테이블의 `postscript` 필드에서 읽는다.
분야 문구 필드가 Airtable에 생기기 전까지는 현재 문구를 유지한다.
분야 페이지는 영어 제목 왼쪽, 영어·한국어 설명 오른쪽에 표시한다. 문구를 바꾸려면 `intro` 행의 해당 분야 필드를 수정한다.

## 분야 페이지 문구

분야 페이지 제목과 설명은 Airtable이 아니라 `src/data/airtable-collections.json`에서 관리한다. 영어와 한국어 문구를 바꾸려면 해당 파일을 수정한다.

## 동기화와 배포

Personal Access Token에는 `data.records:read` 권한과 대상 Base 접근 권한이 필요하다. 비밀 토큰을 `VITE_` 변수나 채팅에 넣지 않는다.

프로젝트 루트 `.env`에 다음 값을 둔다.

```env
PORTFOLIO_TOKEN=발급한_토큰
AIRTABLE_BASE_ID=앱_ID
AIRTABLE_TABLE_NAME=collections
AIRTABLE_VIEW_ID=viwraXnT87X1NKzpC
AIRTABLE_CV_TABLE_NAME=cv
AIRTABLE_INTRO_TABLE_NAME=intro
```

로컬에서 `npm run sync`를 실행하면 `src/data/airtable-projects.json`, `src/data/airtable-cv.json`을 갱신한다. 스크립트는 Airtable 레코드를 수정하지 않는다.

GitHub Actions 배포 workflow도 위 테이블 이름을 사용한다. GitHub 저장소의 Actions secret에 `PORTFOLIO_TOKEN`을 설정한다.
