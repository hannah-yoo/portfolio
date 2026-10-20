# Airtable 콘텐츠 관리 가이드

이 사이트는 Airtable의 작품과 CV 데이터를 빌드할 때 가져온다. 브라우저가 Airtable에 직접 연결하지는 않는다.

## 기본 규칙

- 작품 테이블: `artworks_eng`
- CV 테이블: `cv_eng`
- 소개 테이블: `intro_eng`
- 한 작품은 작품 테이블의 한 행으로 관리한다.
- 필드 이름은 소문자와 공백을 권장한다. 예: `hero image`, `image 2`–`image 10`, `external url`
- 필드 이름은 대소문자를 구분하지 않는다. 공백, 밑줄, 하이픈도 정규화한다. 그래도 아래 이름을 그대로 쓰는 편이 가장 안전하다.
- `grid width`는 현재 Airtable에서 읽지 않는다. 삭제해도 된다.

## 작품 테이블

`artworks_eng`에 작품마다 한 행을 만든다.

| 필드 이름 | Airtable 필드 유형 | 설명 |
| --- | --- | --- |
| `order` | 숫자 | 작품 표시 순서. 작은 숫자가 먼저 표시됨 |
| `title` | 한 줄 텍스트 | 작품 제목 |
| `subtitle` | 한 줄 텍스트 | 짧은 설명 |
| `year` | 한 줄 텍스트 또는 날짜 | 표시할 연도 |
| `category` | 한 줄 텍스트 또는 단일 선택 | `design`, `fine-arts`, `photography-video` 중 하나 |
| `hero image` | 첨부파일 | 목록 카드와 상세 페이지에 쓰는 대표 이미지 1장 |
| `image 2`–`image 10` | 첨부파일 | 상세 페이지 이미지 2–10. 사진별로 한 장씩 첨부 |
| `description` | 긴 텍스트 | 작품 설명 |
| `role` | 한 줄 텍스트 | 맡은 역할. 여러 역할은 쉼표로 구분 |
| `team` | 한 줄 텍스트 | 팀, 고객 또는 협업자 |
| `timeline` | 한 줄 텍스트 | 작업 기간 |
| `tags` | 한 줄 텍스트 또는 다중 선택 | 필터용 태그. 여러 태그는 쉼표로 구분 |
| `medium` | 한 줄 텍스트 또는 다중 선택 | 디자인 분야. 예: `editorial design`, `art direction` |
| `featured` | 체크박스 또는 텍스트 | 추천 작품 여부 |
| `url` | URL | 외부 작업 링크. 방송 링크 등에 사용 |

`order` 값은 작품 목록과 다음 작품 순서에 적용된다. 모든 작품에 중복 없는 정수를 입력하는 방식을 권장한다. 값이 비어 있거나 중복이면 Airtable 행 순서를 보조 기준으로 사용한다.

### 사진 올리기

1. 대표 이미지에는 `hero image` 필드에 사진 한 장을 첨부한다.
2. 상세 이미지는 `image 2`부터 `image 10`까지 순서대로 한 장씩 첨부한다. 빈 칸은 건너뛰고 번호 순으로 표시한다.
3. `image 2`–`image 10` 필드는 Airtable에서 직접 추가해야 한다. 대표 이미지와 상세 이미지는 별도로 관리한다.

`image 2`–`image 10`이 모두 비어 있을 때는 기존 `images` 다중 첨부 필드의 사진을 대신 읽는다. Airtable 계정의 첨부 개수와 파일 크기 제한은 별도로 적용된다.

상세 이미지 비율은 원본 크기로 표시한다. 이미지 파일은 사이트 저장소에 복사하지 않고 Airtable 첨부 URL에서 직접 불러온다. 따라서 저장소와 배포 파일 크기는 작게 유지된다. Airtable 첨부 URL은 만료될 수 있으므로 동기화 후 오래 지나 이미지가 사라지면 다시 배포해 URL을 갱신한다.

### 카테고리 값

- `design`: 디자인 작업
- `fine-arts`: 미술, 일러스트, 글 작업
- `photography-video`: 사진, 영상, 영상 제작

새 사진·영상 작품에는 `photography-video`를 사용한다. `broadcasts`, `broadcast`, `engineering` 분류의 과거 레코드는 사이트에서 제외된다.

사이트는 카테고리 값으로 화면을 정한다. `medium` 값은 Design 페이지의 필터로 표시된다. 여러 분야는 다중 선택이나 쉼표 구분 텍스트로 입력한다. 예: `editorial design`, `visual identity`, `digital product design`, `art direction`.

## CV 테이블

`cv_eng`에 경력이나 활동마다 한 행을 만든다.

| 필드 이름 | Airtable 필드 유형 | 설명 |
| --- | --- | --- |
| `order` | 숫자 | 표시 순서. 작을수록 먼저 표시 |
| `year` | 한 줄 텍스트 | 연도 또는 기간 |
| `title` | 한 줄 텍스트 | 직함, 활동, 학위 |
| `organization` | 한 줄 텍스트 | 회사, 학교, 고객 또는 기관 |
| `description` | 긴 텍스트 | 상세 설명 |

CV 항목은 `order` 순으로 표시한다.

## 소개 테이블

`intro_eng`에는 레코드 한 행만 만든다.

| 필드 이름 | Airtable 필드 유형 | 설명 |
| --- | --- | --- |
| `intro` | 긴 텍스트 | 프로필 소개글 |
| `postscript` | 긴 텍스트 | 소개 뒤에 표시할 추가 문단 |

소개와 추가 문단은 각각 이 한 행에 입력한다. 동기화 코드는 새 테이블을 우선 사용한다. 새 테이블을 읽을 수 없거나 두 값이 비어 있으면 `cv_eng`의 기존 `intro`, `postscript` 값을 fallback으로 사용한다.

## 테이블 이름 변경

기존 `Artworks_eng` 테이블 이름을 Airtable에서 `artworks_eng`로 바꾼다. 행과 첨부파일은 삭제하지 않는다. 이어 `intro_eng` 테이블을 만들고 위 필드를 추가한다.

순서가 중요하다. 배포 workflow는 `artworks_eng` 이름으로 작품 데이터를 읽는다. Airtable에서 이름을 바꾼 뒤 코드를 배포한다. 로컬 `.env`에 `AIRTABLE_TABLE_NAME=Artworks_eng`가 있으면 `artworks_eng`로 수정한다.

## 로컬 동기화

Airtable Personal Access Token에 `data.records:read` 권한을 주고, 포트폴리오 Base에 접근 권한을 설정한다. 토큰은 채팅이나 코드에 넣지 않는다.

프로젝트 루트의 `.env`에 다음 값을 저장한다. `.env`는 Git에 올라가지 않는다.

```env
PORTFOLIO_TOKEN=발급한_토큰
AIRTABLE_BASE_ID=앱_ID
AIRTABLE_TABLE_NAME=artworks_eng
AIRTABLE_CV_TABLE_NAME=cv_eng
AIRTABLE_INTRO_TABLE_NAME=intro_eng
```

`PORTFOLIO_TOKEN`에 `VITE_` 접두사를 붙이지 않는다. 접두사를 붙이면 비밀 토큰이 브라우저 코드에 포함될 수 있다.

작업물 데이터를 가져오려면 프로젝트 폴더에서 실행한다.

```bash
npm run sync
```

이 명령은 Airtable을 읽고 `src/data/airtable-projects.json`, `src/data/airtable-cv.json`을 갱신한다. `medium` 값은 Design 페이지 필터로 연결한다. 이미지 파일은 내려받지 않고 Airtable 첨부 URL만 기록한다. 이 스크립트는 Airtable 레코드를 수정하지 않는다.

로컬에서 화면을 확인하려면:

```bash
npm run dev
```

GitHub Pages에 게시하려면 GitHub 저장소의 Actions secret에 `PORTFOLIO_TOKEN`을 추가하고 배포 workflow를 실행한다. 배포 빌드가 Airtable에서 다시 동기화한다.

## 자주 생기는 문제

- 데이터가 바뀌지 않음: 토큰, Base 접근 권한, 테이블 이름을 확인하고 `npm run sync`를 실행한다.
- 이미지가 안 나옴: 필드 유형이 첨부파일인지, 필드 이름이 `hero image` 또는 `images`인지 확인한다.
- 소개가 안 바뀜: `intro_eng`에 한 행과 `intro`, `postscript` 필드가 있는지 확인한다.
- 분야 필터가 안 보임: 작품 테이블 `medium` 값과 `category=design`을 확인한다.
- 카테고리가 잘못 표시됨: `category`에 `design`, `fine-arts`, `photography-video` 중 하나를 입력한다.
- 동기화에 실패함: PAT에 `data.records:read` 권한이 있는지, 대상 Base에 접근 가능한지 확인한다.

게시된 작품과 이미지는 공개 웹사이트에서 누구나 볼 수 있다. Airtable 토큰만 비밀로 관리한다.
