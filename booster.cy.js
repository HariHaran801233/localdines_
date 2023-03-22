import {
  loginPage
} from "../z-includes/login_page"
var loginpage = new loginPage();
context('TRAINER AND TRAINEE CONTEXUAL SESSIONS', () => {
  beforeEach(() => {
    loginpage.navigate('/')
    cy.viewport(1400, 800)
  })
  let story_session_pin;
  //directions  
  Cypress._.times(3, (t) => {
    var session = t + 1;
    var story_index = t;
    describe('TRAINER CREATE BOPOSTER FOR TRAINEE', () => {
      it('Booster create', function() {
        cy.log(t)
        cy.visit('/login')
        loginpage.Login()
        loginpage.clickLogin()
        cy.get('.card-header > .btn').click()
        cy.get('#trainee_id').type('booster-dir-test-' + session)
        cy.get('#category_type').select('Booster').should('have.value', '4')
        cy.get('#booster_id').select('Directions').should('have.value', '1')
        cy.get('#booster_range').select(session).should('have.value', session)
        cy.get('.btn-primary').click()
        cy.get("tbody > :nth-child(1) > :nth-child(2)").then(function(PIN) {
          story_session_pin = PIN.text();
        })
      })
    })
    describe('TRAINEE WRITING BOOSTER SESSION ', () => {
      Cypress._.times(2, () => {
        it('Booster session write', () => {
          cy.get('#sessionpin').type(story_session_pin)
          cy.get('#submit').click()
          cy.get('#jsStartSession').click()
          cy.fixture('booster_dir_storys').then((story) => {
            var b_story = story[story_index].b_st
            var b_story_missing = story[story_index].b_st_missing
            cy.get('#jsWriteup').type(b_story)
            cy.get('#jsSubmit').click()
            cy.get('#jsUserMessage')
              .should('include.text', 'Please use all the words to build the story!')
            cy.get('#jsWriteup').type(b_story_missing)
            cy.get('#jsSubmit').click()
          })
        })
        it('booster session Approve', () => {
          cy.visit('/login')
          loginpage.Login()
          loginpage.clickLogin()
          cy.get('.nav > [href="http://stage.codecygnus.com/kessler/public/trainee"]').click()
          cy.get(':nth-child(1) > :nth-child(8) > [role="button"][title="Approve"]').click()
          cy.get('#jsSubmit').click()
        })
        it('booster session Test', () => {
          cy.get('#sessionpin').type(story_session_pin)
          cy.get('#submit').click()
          //cy.get('#jsReloadPage').click()
          cy.get('#jsStartSession').click()
          cy.get('#jsStoryContinue').invoke('removeClass', 'disabled').click()
          if (session == 1) {
            cy.fixture('booster_dir1_words_.json').then(function(words) {
              for (const count in words) {
                const dir_word2 = 'booster_' + session + '_word_2';
                const val = words[count][dir_word2];
                cy.get('#jsRecallWord').type(val + '{enter}')
              }
            })
            cy.get('#jsSubmit').click()
            cy.get('#jsConfirmSubmit').click()
            cy.get('#jsStartSession').click()
            cy.fixture('booster_dir1_words_.json').then((words) => {
              for (const count in words) {
                const dir_word1 = 'booster_' + session + '_word_1';
                const dir_word2 = 'booster_' + session + '_word_2';
                const val1 = words[count][dir_word1];
                const val2 = words[count][dir_word2];
                cy.log('val2', val2)
                cy.get('#answer').type(val2)
                cy.get('#jsNext').should('have.text', 'CHECK').click()
                cy.wait(1000)
                cy.get('#jsUserMessage').then(($jsUserMessage) => {
                  if ($jsUserMessage.hasClass('alert-success')) {
                    cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                  } else if ($jsUserMessage.hasClass('alert-info')) {
                    cy.get('#jsUserMessage').should('include.text', 'Your response is incorrect.')
                    cy.get('#answer').type(val1)
                    cy.get('#jsNext').should('have.text', 'CHECK').click()
                    cy.wait(1000)
                    cy.get('#jsUserMessage').then(($jsUserMessage1) => {
                      if ($jsUserMessage1.hasClass('alert-success')) {
                        cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                      } else if ($jsUserMessage1.hasClass('alert-danger')) {
                        cy.get('#jsUserMessage').should('include.text', 'Oops sorry! The correct answer is:')
                      }
                    })
                  }
                })
                cy.get('#jsNext').should('have.text', 'NEXT').click()
              }
            })
          } else if (session == 2) {
            cy.fixture('booster_dir2_words_.json').then(function(words) {
              for (const count in words) {
                const dir_word2 = 'booster_' + session + '_word_2';
                const val = words[count][dir_word2];
                cy.get('#jsRecallWord').type(val + '{enter}')
              }
            })
            cy.get('#jsSubmit').click()
            cy.get('#jsConfirmSubmit').click()
            cy.get('#jsStartSession').click()
            cy.fixture('booster_dir2_words_.json').then((words) => {
              for (const count in words) {
                const dir_word1 = 'booster_' + session + '_word_1';
                const dir_word2 = 'booster_' + session + '_word_2';
                const val1 = words[count][dir_word1];
                const val2 = words[count][dir_word2];
                cy.log('val2', val2)
                cy.get('#answer').type(val2)
                cy.get('#jsNext').should('have.text', 'CHECK').click()
                cy.wait(1000)
                cy.get('#jsUserMessage').then(($jsUserMessage) => {
                  if ($jsUserMessage.hasClass('alert-success')) {
                    cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                  } else if ($jsUserMessage.hasClass('alert-info')) {
                    cy.get('#jsUserMessage').should('include.text', 'Your response is incorrect.')
                    cy.get('#answer').type(val1)
                    cy.get('#jsNext').should('have.text', 'CHECK').click()
                    cy.wait(1000)
                    cy.get('#jsUserMessage').then(($jsUserMessage1) => {
                      if ($jsUserMessage1.hasClass('alert-success')) {
                        cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                      } else if ($jsUserMessage1.hasClass('alert-danger')) {
                        cy.get('#jsUserMessage').should('include.text', 'Oops sorry! The correct answer is:')
                      }
                    })
                  }
                })
                cy.get('#jsNext').should('have.text', 'NEXT').click()
              }
            })
          } else if (session == 3) {
            cy.fixture('booster_dir3_words_.json').then(function(words) {
              for (const count in words) {
                const dir_word2 = 'booster_' + session + '_word_2';
                const val = words[count][dir_word2];
                cy.get('#jsRecallWord').type(val + '{enter}')
              }
            })
            cy.get('#jsSubmit').click()
            cy.get('#jsConfirmSubmit').click()
            cy.get('#jsStartSession').click()
            cy.fixture('booster_dir3_words_.json').then((words) => {
              for (const count in words) {
                const dir_word1 = 'booster_' + session + '_word_1';
                const dir_word2 = 'booster_' + session + '_word_2';
                const val1 = words[count][dir_word1];
                const val2 = words[count][dir_word2];
                cy.log('val2', val2)
                cy.get('#answer').type(val2)
                cy.get('#jsNext').should('have.text', 'CHECK').click()
                cy.wait(1000)
                cy.get('#jsUserMessage').then(($jsUserMessage) => {
                  if ($jsUserMessage.hasClass('alert-success')) {
                    cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                  } else if ($jsUserMessage.hasClass('alert-info')) {
                    cy.get('#jsUserMessage').should('include.text', 'Your response is incorrect.')
                    cy.get('#answer').type(val1)
                    cy.get('#jsNext').should('have.text', 'CHECK').click()
                    cy.wait(1000)
                    cy.get('#jsUserMessage').then(($jsUserMessage1) => {
                      if ($jsUserMessage1.hasClass('alert-success')) {
                        cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                      } else if ($jsUserMessage1.hasClass('alert-danger')) {
                        cy.get('#jsUserMessage').should('include.text', 'Oops sorry! The correct answer is:')
                      }
                    })
                  }
                })
                cy.get('#jsNext').should('have.text', 'NEXT').click()
              }
            })
          }
          cy.get('#jsHome').click()
        })
      })
    })
    describe('TRAINER BOOSTER  view & edit', () => {
      it('BOOSTER  view & edit', () => {
        cy.visit('/login')
        loginpage.Login()
        loginpage.clickLogin()
        cy.get('.nav > [href="http://stage.codecygnus.com/kessler/public/trainee"]').click()
        cy.get(':nth-child(1) > :nth-child(8) > :nth-child(2) > .svg-inline--fa > path').click()
        cy.get(':nth-child(5) > :nth-child(3) > :nth-child(2) .jsEditAnswer .svg-inline--fa > path').click()
        cy.get('.btn-secondary').click()
        cy.get(':nth-child(5) > :nth-child(3) > :nth-child(2) .jsEditAnswer .svg-inline--fa > path').click()
        cy.get('#jsSaveAnswer').click()
        cy.get('#jsUserMessage').should('include.text', 'Invalid answer!')
        cy.fixture('booster_dir_storys').then((story) => {
          var edit_word = story[story_index].b_st_ed
          cy.get('#jsUserAnswer').type('{selectall}{backspace}' + edit_word)
          cy.get('#jsSaveAnswer').click()
          cy.get(':nth-child(3) > .type').should('include.text', edit_word)
        })
        cy.get('.card-header > .btn').CLICK
      })
    })
  })
  //  shopping
  Cypress._.times(3, (t) => {
    var session = t + 1;
    var story_index = t;
    describe('TRAINER CREATE BOOSTER FOR TRAINEE', () => {
      it('Booster create', function() {
        cy.log(t)
        cy.visit('/login')
        loginpage.Login()
        loginpage.clickLogin()
        cy.get('.card-header > .btn').click()
        cy.get('#trainee_id').type('booster-dir-test-' + session)
        cy.get('#category_type').select('Booster').should('have.value', '4')
        cy.get('#booster_id').select('Shopping').should('have.value', '2')
        cy.get('#booster_range').select(session).should('have.value', session)
        cy.get('.btn-primary').click()
        cy.get("tbody > :nth-child(1) > :nth-child(2)").then(function(PIN) {
          story_session_pin = PIN.text();
        })
      })
    })

    describe('TRAINEE WRITING BOOSTER SESSION ', () => {
      Cypress._.times(2, () => {
        it('Booster session write', () => {
          cy.get('#sessionpin').type(story_session_pin)
          cy.get('#submit').click()
          cy.get('#jsStartSession').click()
          cy.fixture('booster_shop_storys').then((story) => {
            var b_story = story[story_index].b_st
            var b_story_missing = story[story_index].b_st_missing
            cy.get('#jsWriteup').type(b_story)
            cy.get('#jsSubmit').click()
            cy.get('#jsUserMessage')
              .should('include.text', 'Please use all the words to build the story!')
            cy.get('#jsWriteup').type(b_story_missing)
            cy.get('#jsSubmit').click()
          })
        })
        it('gendral session Approve', () => {
          cy.visit('/login')
          loginpage.Login()
          loginpage.clickLogin()
          cy.get('.nav > [href="http://stage.codecygnus.com/kessler/public/trainee"]').click()
          cy.get(':nth-child(1) > :nth-child(8) > [role="button"][title="Approve"]').click()
          cy.get('#jsSubmit').click()
        })
        it('gendral session Test', () => {
          cy.get('#sessionpin').type(story_session_pin)
          cy.get('#submit').click()
          //cy.get('#jsReloadPage').click()
          cy.get('#jsStartSession').click()
          cy.get('#jsStoryContinue').invoke('removeClass', 'disabled').click()
          cy.fixture('booster_shop_words_.json').then(function(words) {
            for (const count in words) {
              const dir_word2 = 'booster_' + session + '_word_2';
              const val = words[count][dir_word2];
              cy.get('#jsRecallWord').type(val + '{enter}')
            }
          })
          cy.get('#jsSubmit').click()
          cy.get('#jsConfirmSubmit').click()
          cy.get('#jsStartSession').click()
          cy.fixture('booster_shop_words_.json').then((words) => {
            for (const count in words) {
              const dir_word1 = 'booster_' + session + '_word_1';
              const dir_word2 = 'booster_' + session + '_word_2';
              const val1 = words[count][dir_word1];
              const val2 = words[count][dir_word2];
              cy.log('val2', val2)
              cy.get('#answer').type(val2)
              cy.get('#jsNext').should('have.text', 'CHECK').click()
              cy.wait(1000)
              cy.get('#jsUserMessage').then(($jsUserMessage) => {
                if ($jsUserMessage.hasClass('alert-success')) {
                  cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                } else if ($jsUserMessage.hasClass('alert-info')) {
                  cy.get('#jsUserMessage').should('include.text', 'Your response is incorrect.')
                  cy.get('#answer').type(val1)
                  cy.get('#jsNext').should('have.text', 'CHECK').click()
                  cy.wait(1000)
                  cy.get('#jsUserMessage').then(($jsUserMessage1) => {
                    if ($jsUserMessage1.hasClass('alert-success')) {
                      cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                    } else if ($jsUserMessage1.hasClass('alert-danger')) {
                      cy.get('#jsUserMessage').should('include.text', 'Oops sorry! The correct answer is:')
                    }
                  })
                }
              })
              cy.get('#jsNext').should('have.text', 'NEXT').click()
            }
          })
          cy.get('#jsHome').click()
        })
      })
    })
    describe('TRAINER Booster  view & edit', () => {
      it('Booster  view & edit', () => {
        cy.visit('/login')
        loginpage.Login()
        loginpage.clickLogin()
        cy.get('.nav > [href="http://stage.codecygnus.com/kessler/public/trainee"]').click()
        cy.get(':nth-child(1) > :nth-child(8) > :nth-child(2) > .svg-inline--fa > path').click()
        cy.get(':nth-child(5) > :nth-child(3) > :nth-child(2) .jsEditAnswer .svg-inline--fa > path').click()
        cy.get('.btn-secondary').click()
        cy.get(':nth-child(5) > :nth-child(3) > :nth-child(2) .jsEditAnswer .svg-inline--fa > path').click()
        cy.get('#jsSaveAnswer').click()
        cy.get('#jsUserMessage').should('include.text', 'Invalid answer!')
        cy.fixture('booster_shop_storys').then((story) => {
          var edit_word = story[story_index].b_st_ed
          cy.get('#jsUserAnswer').type('{selectall}{backspace}' + edit_word)
          cy.get('#jsSaveAnswer').click()
          cy.get(':nth-child(3) > .type').should('include.text', edit_word)
        })
        cy.get('.card-header > .btn').CLICK
      })
    })
  })
  // //todo
  Cypress._.times(3, (t) => {
    var session = t + 1;
    var story_index = t;
    describe('TRAINER CREATE BOOSTER FOR TRAINEE', () => {
      it('BOOSTER create', function() {
        cy.log(t)
        cy.visit('/login')
        loginpage.Login()
        loginpage.clickLogin()
        cy.get('.card-header > .btn').click()
        cy.get('#trainee_id').type('booster-dir-test-' + session)
        cy.get('#category_type').select('Booster').should('have.value', '4')
        cy.get('#booster_id').select('To Do').should('have.value', '3')
        cy.get('#booster_range').select(session).should('have.value', session)
        cy.get('.btn-primary').click()
        cy.get("tbody > :nth-child(1) > :nth-child(2)").then(function(PIN) {
          story_session_pin = PIN.text();
        })
      })
    })

    describe('TRAINEE WRITING BOOSTER SESSION ', () => {
      Cypress._.times(2, () => {
        it('Booster session write', () => {
          cy.get('#sessionpin').type(story_session_pin)
          cy.get('#submit').click()
          cy.get('#jsStartSession').click()
          cy.fixture('booster_todo_storys').then((story) => {
            var t_story = story[story_index].t_st
            var t_story_missing = story[story_index].t_st_missing
            cy.get('#jsWriteup').type(t_story)
            cy.get('#jsSubmit').click()
            cy.get('#jsUserMessage')
              .should('include.text', 'Please use all the words to build the story!')
            cy.get('#jsWriteup').type(t_story_missing)
            cy.get('#jsSubmit').click()
          })
        })
        it('booster session Approve', () => {
          cy.visit('/login')
          loginpage.Login()
          loginpage.clickLogin()
          cy.get('.nav > [href="http://stage.codecygnus.com/kessler/public/trainee"]').click()
          cy.get(':nth-child(1) > :nth-child(8) > [role="button"][title="Approve"]').click()
          cy.get('#jsSubmit').click()
        })
        it('booster session Test', () => {
          cy.get('#sessionpin').type(story_session_pin)
          cy.get('#submit').click()
          //cy.get('#jsReloadPage').click()
          cy.get('#jsStartSession').click()
          cy.get('#jsStoryContinue').invoke('removeClass', 'disabled').click()
          cy.fixture('booster_todo_words_.json').then(function(words) {
            for (const count in words) {
              const dir_word2 = 'todo_' + session + '_word_2';
              const val = words[count][dir_word2];
              cy.get('#jsRecallWord').type(val + '{enter}')
            }
          })
          cy.get('#jsSubmit').click()
          cy.get('#jsConfirmSubmit').click()
          cy.get('#jsStartSession').click()
          cy.fixture('booster_todo_words_.json').then((words) => {
            for (const count in words) {
              const dir_word1 = 'todo_' + session + '_word_1';
              const dir_word2 = 'todo_' + session + '_word_2';
              const val1 = words[count][dir_word1];
              const val2 = words[count][dir_word2];
              cy.log('val2', val2)
              cy.get('#answer').type(val2)
              cy.get('#jsNext').should('have.text', 'CHECK').click()
              cy.wait(1000)
              cy.get('#jsUserMessage').then(($jsUserMessage) => {
                if ($jsUserMessage.hasClass('alert-success')) {
                  cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                } else if ($jsUserMessage.hasClass('alert-info')) {
                  cy.get('#jsUserMessage').should('include.text', 'Your response is incorrect.')
                  cy.get('#answer').type(val1)
                  cy.get('#jsNext').should('have.text', 'CHECK').click()
                  cy.wait(1000)
                  cy.get('#jsUserMessage').then(($jsUserMessage1) => {
                    if ($jsUserMessage1.hasClass('alert-success')) {
                      cy.get('#jsUserMessage').should('include.text', 'Excellent.')
                    } else if ($jsUserMessage1.hasClass('alert-danger')) {
                      cy.get('#jsUserMessage').should('include.text', 'Oops sorry! The correct answer is:')
                    }
                  })
                }
              })
              cy.get('#jsNext').should('have.text', 'NEXT').click()
            }
          })
          cy.get('#jsHome').click()
        })
      })
    })
    describe('TRAINER Booster  view & edit', () => {
      it('Booster  view & edit', () => {
        cy.visit('/login')
        loginpage.Login()
        loginpage.clickLogin()
        cy.get('.nav > [href="http://stage.codecygnus.com/kessler/public/trainee"]').click()
        cy.get(':nth-child(1) > :nth-child(8) > :nth-child(2) > .svg-inline--fa > path').click()
        cy.get(':nth-child(5) > :nth-child(3) > :nth-child(2) .jsEditAnswer .svg-inline--fa > path').click()
        cy.get('.btn-secondary').click()
        cy.get(':nth-child(5) > :nth-child(3) > :nth-child(2) .jsEditAnswer .svg-inline--fa > path').click()
        cy.get('#jsSaveAnswer').click()
        cy.get('#jsUserMessage').should('include.text', 'Invalid answer!')
        cy.fixture('booster_todo_storys').then((story) => {
          var edit_word = story[story_index].t_st_ed
          cy.get('#jsUserAnswer').type('{selectall}{backspace}' + edit_word)
          cy.get('#jsSaveAnswer').click()
          cy.get(':nth-child(3) > .type').should('include.text', edit_word)
        })
        cy.get('.card-header > .btn').CLICK
      })
    })
  })
  //update and delete
  describe('TRAINER booster update & delete', () => {
    it('update & delete', () => {
      cy.visit('/login')
      loginpage.Login()
      loginpage.clickLogin()
      cy.get('.nav > [href="http://stage.codecygnus.com/kessler/public/trainee"]').click()
      //cy.get(':nth-child(1) > :nth-child(8) > [role="button"][title="Report"]').click()
      //cy.get('#layoutSidenav_content > :nth-child(2) > :nth-child(2) > :nth-child(1)').should('include.text','Story-test-'+session)
      cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > .btn').click()
      //cy.get(':nth-child(1) > :nth-child(8) > [role="button"][title="Add"]').click()
      //cy.get('.card-header > .btn').click()
      cy.get('#trainee_id').type('booster-dir-test')
      cy.get('#category_type').select('Booster').should('have.value', '4')
      cy.get('#booster_id').select('To Do').should('have.value', '3')
      cy.get('#booster_range').select('1').should('have.value', '1')
      cy.get('.btn-primary').click()
      cy.get(':nth-child(1) > :nth-child(8) > [role="button"][title="Edit"]').click()
      cy.get('.ml-2').click()
      cy.get(':nth-child(1) > :nth-child(8) > [role="button"][title="Edit"]').click()
      cy.get('#scratch').click()
      cy.get('.btn-primary').click()
      cy.wait(1000)
      cy.get('.modal-footer > .btn-danger').click()
      cy.wait(1000)
      cy.get('.btn-primary').click()
      cy.get('#jsConfirmSubmit').click()
      cy.get('.alert-success').should('include.text', 'Trainee information has been updated succesfully!')
      cy.get(':nth-child(1) > :nth-child(8) > .d-inline > .btn').click()
      cy.get('#jsConfirmSubmit').click();
      cy.get('.alert-success').should('include.text', ' Trainee has been deleted succesfully!')
    })
  })
})
