const { body, validationResult } = require('express-validator');

// Middleware for validating and sanitizing input
const validateLoginInput = [


  // Validate password
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .trim(),

  // Sanitize inputs
  body('*').escape(),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateLoginInput;
