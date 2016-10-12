'use strict'

const expect = require('chai').expect
const validator = require('../../lib/validator')

describe('validator', () => {
  // Testing various ways to define cells
  ;[
    {
      cells: [
        {
          model: 'foo'
        }
      ],
      type: 'form',
      version: '2.0'
    },
    {
      cellDefinitions: {
        foo: {
          model: 'foo'
        }
      },
      cells: [
        {
          extends: 'foo'
        }
      ],
      type: 'form',
      version: '2.0'
    },
    {
      cells: [
        {
          children: [
            {
              model: 'foo'
            }
          ]
        }
      ],
      type: 'form',
      version: '2.0'
    },
    {
      cellDefinitions: {
        foo: {
          model: 'foo'
        }
      },
      cells: [
        {
          children: [
            {
              extends: 'foo'
            }
          ]
        }
      ],
      type: 'form',
      version: '2.0'
    },
    {
      cellDefinitions: {
        foo: {
          children: [
            {
              model: 'foo'
            }
          ]
        }
      },
      cells: [
        {
          extends: 'foo'
        }
      ],
      type: 'form',
      version: '2.0'
    },
    {
      containers: [
        {
          id: 'main',
          rows: [
            [
              {
                model: 'foo'
              }
            ]
          ]
        }
      ],
      rootContainers: [
        {
          container: 'main',
          label: 'Main'
        }
      ],
      type: 'form',
      version: '1.0'
    }
  ]
    .forEach((view) => {
      describe('when valid', () => {
        var result

        beforeEach(() => {
          const model = {
            properties: {
              foo: {
                type: 'string'
              }
            },
            type: 'object'
          }

          const renderers = []

          function validateRenderer (rendererName) {
            return rendererName === 'foo-bar-renderer'
          }

          result = validator.validate(view, model, renderers, validateRenderer)
        })

        it('returns proper result', () => {
          expect(result).deep.equal({
            errors: [],
            warnings: []
          })
        })
      })
    })
})

describe('validator', () => {
  describe('when valid', () => {
    var result

    beforeEach(() => {
      const model = {
        type: 'object',
        properties: {
          nested: {
            type: 'object',
            properties: {
              foo: {
                type: 'object',
                properties: {
                  foosValue: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }

      const view = {
        type: 'form',
        version: '2.0',
        cells: [
          {
            children: [
              {
                label: 'Main',
                model: 'nested',
                children: [
                  {
                    label: 'Foo',
                    model: 'foo',
                    children: [
                      {
                        label: 'value',
                        model: 'foosValue'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }

      const renderers = []

      function validateRenderer (rendererName) {
        return rendererName === 'foo-bar-renderer'
      }

      result = validator.validate(view, model, renderers, validateRenderer)
    })

    it('returns proper result', () => {
      expect(result).deep.equal({
        errors: [],
        warnings: []
      })
    })
  })
})
