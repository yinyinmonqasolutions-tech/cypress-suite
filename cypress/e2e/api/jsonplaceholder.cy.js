describe('JSONPlaceholder — REST API Tests', () => {

  const BASE = 'https://jsonplaceholder.typicode.com'

  // ── GET ──────────────────────────────────────────
  it('TC-301 | GET /posts returns 100 posts', () => {
    cy.request('GET', `${BASE}/posts`)
      .then(res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.length(100)
        expect(res.body[0]).to.have.all.keys(
          'userId', 'id', 'title', 'body'
        )
      })
  })

  it('TC-302 | GET /posts/1 returns correct post', () => {
    cy.request(`${BASE}/posts/1`).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body.id).to.eq(1)
      expect(res.body.title).to.be.a('string')
    })
  })

  // ── POST ─────────────────────────────────────────
  it('TC-303 | POST /posts creates a new post', () => {
    const newPost = {
      title:  'Cypress API Test',
      body:   'Automated by yinyinmon',
      userId: 1
    }

    cy.request({
      method: 'POST',
      url:    `${BASE}/posts`,
      body:   newPost
    }).then(res => {
      expect(res.status).to.eq(201)
      expect(res.body.title).to.eq('Cypress API Test')
      expect(res.body).to.have.property('id')
    })
  })

  // ── PUT ──────────────────────────────────────────
  it('TC-304 | PUT /posts/1 updates a post', () => {
    cy.request({
      method: 'PUT',
      url:    `${BASE}/posts/1`,
      body:   { id: 1, title: 'Updated Title', body: 'Updated body', userId: 1 }
    }).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body.title).to.eq('Updated Title')
    })
  })

  // ── DELETE ───────────────────────────────────────
  it('TC-305 | DELETE /posts/1 returns 200', () => {
    cy.request('DELETE', `${BASE}/posts/1`)
      .its('status')
      .should('eq', 200)
  })

  // ── 404 ──────────────────────────────────────────
  it('TC-306 | GET /posts/9999 returns 404', () => {
    cy.request({
      url:                `${BASE}/posts/9999`,
      failOnStatusCode:   false
    }).its('status').should('eq', 404)
  })

  // ── Response time ─────────────────────────────────
  it('TC-307 | API response time under 2 seconds', () => {
    cy.request(`${BASE}/posts`)
      .its('duration')
      .should('be.lessThan', 2000)
  })
})