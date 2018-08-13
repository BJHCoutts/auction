class Api::ApplicationController < ApplicationController
  rescue_from StandardError, with: :standard_error

  # Use the method "rescue_from" in a Controller to interrupt
  # it from crashing. Instead, "rescue_from" will a method that
  # we pass it to named argument "with:".

  # As a first argument, "rescue_from" requires the class
  # of the error we want to interrupt.

  # For example, the line below will call a method "record_not_found"
  # when the error ActiveRecord:RecordNotFound is raised.
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  # The priority for "rescue_from" is the reverse order of the
  # line in which the calls are made. Meaning that more specific
  # errors should be rescued last and the broadest errors should
  # be rescued first.
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid


  # When making POST, DELETE & PATCH requests to
  # our controllers, Rails requires that an authenticity
  # token is included as part of the params. Normally,
  # Rails will add this to any form that generate
  # form helper methods (e.g. `form_tag`, form_for`, etc).
  # This prevents third-parties from making such requests
  # to our Rails. It's a security measure that is
  # unecessary in the context of a Web API.
  skip_before_action(:verify_authenticity_token)

  def not_found
    render(
      status: 404,
      json: {
        status: 404,
        errors: [{
          type: "NotFound"
        }]
      }
    )
  end

  private
  def authenticate_user!
    unless current_user.present?
      render(json: { status: 401 }, status: 401)
    end
  end

  def record_not_found(error)
    # binding.pry
    # This will pause your program when it encounters the line above.
    # It will open a "pry" session at this location allowing
    # to look and use all the variables in scope.
    # Requires the gem "pry".
    render(
      status: 404,
      json: {
        status: 404,
        errors: [{
          type: error.class.to_s,
          message: error.message
        }]
      }
    )
  end

  def standard_error(error)
    logger.error error.full_message

    render(
      status: 500,
      json: {
        status: 500,
        errors: [{
          type: error.class.to_s,
          message: error.message
        }]
      }
    )
  end

  def record_invalid(error)
    record = error.record
    errors = record.errors.map do |field, message|
      {
        type: error.class.to_s,
        record_type: record.class.to_s,
        field: field,
        message: message
      }
    end

    render(
      status: 422, # Unprocessable Entity Status
      json: {
        status: 422,
        errors: errors
      }
    )
  end
end
